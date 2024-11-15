import {Game} from 'phaser';
import {Boot} from '@/components/game/scenes/Boot';
import {GameOver} from '@/components/game/scenes/GameOver';
import {Game as MainGame} from '@/components/game/scenes/Game';
import {MainMenu} from '@/components/game/scenes/MainMenu';
import {Preloader} from '@/components/game/scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [
    Boot,
    Preloader,
    MainMenu,
    MainGame,
    GameOver
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0, x: 0},
    },
  },
};

const StartGame = (parent: string) => {

  return new Game({...config, parent});

}

export default StartGame;