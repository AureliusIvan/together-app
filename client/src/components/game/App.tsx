"use client";

import {useRef, useState} from 'react';
import {IRefPhaserGame, PhaserGame} from '@/components/game/PhaserGame';
import {MainMenu} from '@/components/game/scenes/MainMenu';
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({x: 0, y: 0});

  const changeScene = () => {

    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  }

  const moveSprite = () => {

    if (phaserRef.current) {

      const scene = phaserRef.current.scene as MainMenu;

      if (scene && scene.scene.key === 'MainMenu') {
        // Get the update logo position
        scene.moveLogo(({x, y}) => {

          setSpritePosition({x, y});

        });
      }
    }

  }

  const addSprite = () => {

    if (phaserRef.current) {
      const scene = phaserRef.current.scene;

      if (scene) {
        // Add more stars
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        //  `add.sprite` is a Phaser GameObjectFactory method, and it returns a Sprite Game Object instance
        const star = scene.add.sprite(x, y, 'star');

        //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
        //  You could, of course, do this from within the Phaser Scene code, but this is just an example
        //  showing that Phaser objects and systems can be acted upon from outside Phaser itself.
        scene.add.tween({
          targets: star,
          duration: 500 + Math.random() * 1000,
          alpha: 0,
          yoyo: true,
          repeat: -1
        });
      }
    }
  }

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  }

  return (
      <div id="app" className={cn(`w-full`)}>
        <PhaserGame ref={phaserRef} currentActiveScene={currentScene}/>
        <div
            className={cn(`fixed top-0 left-0 w-fit h-fit flex flex-col items-center justify-center bg-black text-white p-4 m-4`)}
        >
          <div>
            <Button className="button" onClick={changeScene}>Change Scene</Button>
          </div>
          <div>
            <Button disabled={canMoveSprite} className="button" onClick={moveSprite}>Toggle Movement</Button>
          </div>
          <div className="spritePosition">Sprite Position:
            <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
          </div>
          <div>
            <Button className="button" onClick={addSprite}>Add New Sprite</Button>
          </div>
        </div>
      </div>
  )
}

export default App