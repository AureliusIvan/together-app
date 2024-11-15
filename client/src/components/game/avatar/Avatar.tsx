import {Scene} from 'phaser';
import {io, Socket} from 'socket.io-client';

interface Position {
  x: number;
  y: number;
}

interface PlayerState {
  position: Position;
  isMoving: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | 'idle';
}

export class Avatar {
  sprite: Phaser.GameObjects.Sprite | undefined;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key } | undefined;
  private coordsText: Phaser.GameObjects.Text | undefined;
  private socket: Socket | undefined;
  private readonly playerId: string;
  private lastEmittedState: PlayerState | null = null;
  private readonly MOVEMENT_SPEED = 100;
  private readonly COORD_TEXT_OFFSET = 20;
  private readonly ANIMATION_FRAME_RATE = 10;

  constructor(
      private readonly scene: Scene,
      private readonly initialX: number,
      private readonly initialY: number,
      playerId: string
  ) {
    this.playerId = playerId;
  }

  create(): void {
    this.initializeSprite();
    this.initializeAnimations();
    this.initializeInput();
    this.initializeCoordinatesDisplay();
    this.initializeNetworking();
  }

  private initializeSprite(): void {
    this.sprite = this.scene.physics.add.sprite(this.initialX, this.initialY, 'avatar', 0);
    this.sprite.setOrigin(0.5);
    (this.sprite as Phaser.Physics.Arcade.Sprite).setCollideWorldBounds(true);
  }

  private initializeAnimations(): void {
    if (!this.sprite) return;

    // Running animation
    this.sprite.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('avatar-run', {start: 0, end: 6}),
      frameRate: this.ANIMATION_FRAME_RATE,
      repeat: -1,
    });

    // Add idle animation
    this.sprite.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('avatar', {start: 0, end: 0}),
      frameRate: 1,
    });
  }

  private initializeInput(): void {
    if (!this.scene.input.keyboard) return;

    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.wasdKeys = {
      W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  private initializeCoordinatesDisplay(): void {
    this.coordsText = this.scene.add.text(
        this.initialX,
        this.initialY - this.COORD_TEXT_OFFSET,
        this.formatCoordinates(this.initialX, this.initialY),
        {
          fontSize: '16px',
          stroke: '#000000',
          strokeThickness: 2,
        }
    );
  }

  private initializeNetworking(): void {
    this.socket = io('http://localhost:3001', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupNetworkEventHandlers();
  }

  private setupNetworkEventHandlers(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      this.socket?.emit('join', {
        playerId: this.playerId,
        position: { x: this.initialX, y: this.initialY },
      });
    });

    this.socket.on('disconnect', () => {
      console.warn('Disconnected from server');
    });

    // Handle other players' movements
    this.socket.on('playerMoved', (data: { playerId: string; state: PlayerState }) => {
      if (data.playerId !== this.playerId) {
        // Update other players' positions (implement in game scene)
        this.scene.events.emit('otherPlayerMoved', data);
      }
    });
  }

  update(): void {
    if (!this.sprite) return;

    const movement = this.calculateMovement();
    this.updatePosition(movement);
    this.updateAnimation(movement);
    this.updateCoordinatesDisplay();
    this.emitPositionUpdate(movement);
  }

  private calculateMovement(): { velocityX: number; velocityY: number } {
    let velocityX = 0;
    let velocityY = 0;

    // Horizontal movement
    if (this.cursors?.left.isDown || this.wasdKeys?.A.isDown) {
      velocityX = -this.MOVEMENT_SPEED;
    } else if (this.cursors?.right.isDown || this.wasdKeys?.D.isDown) {
      velocityX = this.MOVEMENT_SPEED;
    }

    // Vertical movement
    if (this.cursors?.up.isDown || this.wasdKeys?.W.isDown) {
      velocityY = -this.MOVEMENT_SPEED;
    } else if (this.cursors?.down.isDown || this.wasdKeys?.S.isDown) {
      velocityY = this.MOVEMENT_SPEED;
    }

    return {velocityX, velocityY};
  }

  private updatePosition(movement: { velocityX: number; velocityY: number }): void {
    if (!this.sprite) return;

    (this.sprite as Phaser.Physics.Arcade.Sprite).setVelocity(
        movement.velocityX,
        movement.velocityY
    );

    // Update sprite direction
    if (movement.velocityX < 0) {
      this.sprite.setFlipX(true);
    } else if (movement.velocityX > 0) {
      this.sprite.setFlipX(false);
    }
  }

  private updateAnimation(movement: { velocityX: number; velocityY: number }): void {
    if (!this.sprite) return;

    const isMoving = movement.velocityX !== 0 || movement.velocityY !== 0;

    if (isMoving && !this.sprite.anims.isPlaying) {
      this.sprite.play('run');
    } else if (!isMoving && this.sprite.anims.isPlaying) {
      this.sprite.play('idle');
    }
  }

  private updateCoordinatesDisplay(): void {
    if (!this.sprite || !this.coordsText) return;

    this.coordsText.setPosition(
        this.sprite.x,
        this.sprite.y - this.COORD_TEXT_OFFSET
    );
    this.coordsText.setText(
        this.formatCoordinates(this.sprite.x, this.sprite.y)
    );
  }

  private formatCoordinates(x: number, y: number): string {
    return `(${Math.round(x)}, ${Math.round(y)})`;
  }

  private emitPositionUpdate(movement: { velocityX: number; velocityY: number }): void {
    if (!this.sprite || !this.socket) return;

    const currentState: PlayerState = {
      position: {
        x: this.sprite.x,
        y: this.sprite.y,
      },
      isMoving: movement.velocityX !== 0 || movement.velocityY !== 0,
      direction: this.getDirection(movement),
    };

    // Only emit if state has changed significantly
    if (this.hasStateChanged(currentState)) {
      this.socket.emit('move', {
        playerId: this.playerId,
        position: {
          x: this.sprite.x,
          y: this.sprite.y,
        }
      });
      this.lastEmittedState = currentState;
    }
  }

  private getDirection(movement: { velocityX: number; velocityY: number }): PlayerState['direction'] {
    if (movement.velocityX < 0) return 'left';
    if (movement.velocityX > 0) return 'right';
    if (movement.velocityY < 0) return 'up';
    if (movement.velocityY > 0) return 'down';
    return 'idle';
  }

  private hasStateChanged(currentState: PlayerState): boolean {
    if (!this.lastEmittedState) return true;

    const positionThreshold = 1; // Minimum position change to trigger update
    const positionChanged =
        Math.abs(currentState.position.x - this.lastEmittedState.position.x) > positionThreshold ||
        Math.abs(currentState.position.y - this.lastEmittedState.position.y) > positionThreshold;

    return (
        positionChanged ||
        currentState.isMoving !== this.lastEmittedState.isMoving ||
        currentState.direction !== this.lastEmittedState.direction
    );
  }

  // Public methods for external interaction
  public getPosition(): Position {
    return {
      x: this.sprite?.x ?? this.initialX,
      y: this.sprite?.y ?? this.initialY,
    };
  }

  public getPlayerId(): string {
    return this.playerId;
  }

  public destroy(): void {
    this.socket?.disconnect();
    this.sprite?.destroy();
    this.coordsText?.destroy();
  }
}