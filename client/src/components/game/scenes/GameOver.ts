import {EventBus} from '../EventBus';
import {Scene} from 'phaser';

export class GameOver extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera | undefined;
  background: Phaser.GameObjects.Image | undefined;
  gameOverText: Phaser.GameObjects.Text | undefined;

  constructor() {
    super('GameOver');
  }

  create() {
    this.camera = this.cameras.main

    this.background = this.add.image(
        this.scale.width / 2,
        this.scale.height / 2,
        'background'
    ).setOrigin(0.5, 0.5);
    this.background.setAlpha(0.5);

    const scaleX = this.scale.width / this.background.width;
    const scaleY = this.scale.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale);

    this.gameOverText = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2,
        'Game Over', {
          fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
          stroke: '#000000', strokeThickness: 8,
          align: 'center'
        }
    ).setOrigin(0.5).setDepth(100);

    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    this.scene.start('MainMenu');
  }
}