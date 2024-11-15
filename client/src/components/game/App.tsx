"use client";

import {PhaserGame} from '@/components/game/PhaserGame';
import {cn} from "@/lib/utils";

/**
 * Game App component
 * @constructor
 */
function App() {
  return (
      <div id="app" className={cn(`w-full`)}>
        <PhaserGame/>`
      </div>
  )
}

export default App