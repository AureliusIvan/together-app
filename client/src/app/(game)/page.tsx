'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import {SocketProvider} from "@/contexts/SocketContext";
import {Chat} from "@/components/chat";

const AppWithoutSSR = dynamic(() => import("@/components/game/App"), {ssr: false});

export default function Home() {
  return (
      <SocketProvider>
        <div className="flex w-full h-full">
          <AppWithoutSSR/>

          <div className="fixed top-0 right-0  w-64">
            <Chat/>
          </div>
        </div>
      </SocketProvider>
  )

}