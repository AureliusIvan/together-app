import {EventBus} from '../EventBus'
import {Scene} from 'phaser'

export class Game extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera | undefined
  background: Phaser.GameObjects.Image | undefined
  gameText: Phaser.GameObjects.Text | undefined
  avatar: Phaser.GameObjects.Sprite | undefined
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  wasdKeys: { [key: string]: Phaser.Input.Keyboard.Key } | undefined
  obstacles: Phaser.GameObjects.Group | undefined

  constructor() {
    super('Game')
  }

  create() {
    // Set up camera and background
    this.camera = this.cameras.main

    // Add the background image and adjust its position and scale to cover the screen
    this.background = this.add.image(
        this.scale.width / 2,
        this.scale.height / 2,
        'background'
    ).setOrigin(0.5, 0.5);

    // Calculate the scale to cover the entire screen
    const scaleX = this.scale.width / this.background.width;
    const scaleY = this.scale.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale);

    // Create the avatar using the spritesheet
    this.avatar = this.physics.add.sprite(
        512,
        384,
        'avatar',
        0
    );
    this.avatar.setOrigin(0.5);
    (this.avatar as Phaser.Physics.Arcade.Sprite).setCollideWorldBounds(true);

    // Create the running animation from the loaded spritesheet
    this.avatar.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('avatar-run', {start: 0, end: 6}), // Use all 7 frames
      frameRate: 10,
      repeat: -1,
    });

    // Set up keyboard input for both arrow keys and WASD keys
    this.cursors = this.input.keyboard?.createCursorKeys()
    this.wasdKeys = {
      W: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    // Set camera to follow avatar and zoom in
    this.camera.startFollow(this.avatar);
    this.camera.setZoom(3.5); // Zoom level can be adjusted

    // Create obstacles based on the background
    this.obstacles = this.add.group();
    this.createObstacles();

    // Add collision between avatar and obstacles
    this.physics.add.collider(this.avatar, this.obstacles);

    EventBus.emit('current-scene-ready', this)
  }

  createObstacles() {
    if (this.background) {
      // Define obstacle positions based on visual features of the background
      // These positions are manually chosen to represent buildings, trees, or other static elements
      const obstaclePositions = [
        {x: 400, y: 300}, // Building area
        {x: 600, y: 500}, // Near windmill
        {x: 800, y: 200}, // On path to bridge
        {x: 1000, y: 600}, // Near trees and rocks
        {x: 1200, y: 400}, // Another key point for an obstacle
      ];

      // Add obstacles at specified positions
      obstaclePositions.forEach((pos) => {
        const obstacle = this.add.rectangle(pos.x, pos.y, 50, 50, 0xff0000);
        this.physics.add.existing(obstacle);
        const physicsObstacle = this.physics.add.existing(obstacle) as unknown as Phaser.Physics.Arcade.StaticBody;
        physicsObstacle.immovable = true;
        this.obstacles?.add(obstacle);
      });
    }
  }

  update() {
    if (this.avatar) {
      // Set movement speed
      const speed = 200
      let velocityX = 0
      let velocityY = 0

      // Check arrow keys or WASD keys for horizontal movement
      if (this.cursors?.left.isDown || this.wasdKeys?.A.isDown) {
        velocityX = -speed
      } else if (this.cursors?.right.isDown || this.wasdKeys?.D.isDown) {
        velocityX = speed
      }

      // Check arrow keys or WASD keys for vertical movement
      if (this.cursors?.up.isDown || this.wasdKeys?.W.isDown) {
        velocityY = -speed
      } else if (this.cursors?.down.isDown || this.wasdKeys?.S.isDown) {
        velocityY = speed
      }

      // Update avatar velocity
      (this.avatar as Phaser.Physics.Arcade.Sprite).setVelocity(velocityX, velocityY);

      // Determine avatar direction and play appropriate animation
      if (velocityX < 0) {
        this.avatar.setFlipX(true); // Facing left
      } else if (velocityX > 0) {
        this.avatar.setFlipX(false); // Facing right
      }

      // Play running animation if moving
      if (velocityX !== 0 || velocityY !== 0) {
        if (this.avatar.anims.currentAnim?.key !== 'run' || !this.avatar.anims.isPlaying) {
          this.avatar.anims.play('run', true);
        }
      } else {
        this.avatar.anims.stop();
        this.avatar.setFrame(0); // Optionally set to a neutral frame when stopped
      }

      // Play running animation if moving
      if (velocityX !== 0 || velocityY !== 0) {
        this.avatar.anims.play('run', true);
      } else {
        this.avatar.anims.stop();
      }
    }
  }

  changeScene() {
    this.scene.start('GameOver')
  }
}
