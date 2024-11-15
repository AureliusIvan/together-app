import {GameObjects, Scene} from 'phaser';
import {EventBus} from '@/components/game/EventBus';

export class MainMenu extends Scene {
  background: GameObjects.Image | undefined;
  logo: GameObjects.Image | undefined;
  title: GameObjects.Text | undefined;
  logoTween: Phaser.Tweens.Tween | null | undefined;

  constructor() {
    super('MainMenu');
  }

  create() {
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

    // Center the logo on the screen
    this.logo = this.add.image(
        this.scale.width / 2,
        this.scale.height / 2 - 100, // Position it slightly above center
        'logo'
    ).setOrigin(0.5, 0.5).setDepth(100);

    // Center the title text below the logo
    this.title = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 60, // Position it slightly below center
        'Main Menu',
        {
          fontFamily: 'Arial Black',
          fontSize: 38,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center'
        }
    ).setOrigin(0.5, 0.5).setDepth(100);

    // Emit the event to signal the scene is ready
    EventBus.emit('current-scene-ready', this);
  }


  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start('Game');
  }

  moveLogo(reactCallback
               :
               ({x, y}: { x: number, y: number }) => void
  ) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: {value: 750, duration: 3000, ease: 'Back.easeInOut'},
        y: {value: 80, duration: 1500, ease: 'Sine.easeOut'},
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (reactCallback) {
            reactCallback({
              x: Math.floor(this.logo!.x),
              y: Math.floor(this.logo!.y)
            });
          }
        }
      });
    }
  }
}