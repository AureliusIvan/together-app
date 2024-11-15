"use client";

import {cn} from "@/lib/utils";
import {useSocket} from "@/hooks/useSocket";
import {useEffect, useState} from "react";

interface Player {
  playerId: string;
  position: { x: number; y: number };
  lastActive: number;
}


export function TopMenu() {
  // player online
  const [playerOnline, setPlayerOnline] = useState<number>(0);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const handleOnlinePlayerCount = (players: Player[]) => {
        setPlayerOnline(players.length);
      };

      // Subscribe to the event
      socket.on('players', handleOnlinePlayerCount);

      // Cleanup the socket event listener when the component is unmounted
      return () => {
        socket.off('players', handleOnlinePlayerCount);
      };
    }
  }, [socket]);

  return (
      <section className={cn(`bg-black w-full h-16 fixed top-0 p-1`)}>
        {/* Player Online */}
        <div className={cn(`text-black text-lg p-4 w-fit h-fit bg-green-400`)}>
          Online: {playerOnline}
        </div>
      </section>
  );
}
