'use client'

import React, {Suspense} from 'react'
import dynamic from 'next/dynamic'
import {Chat} from "@/components/chat";

const AppWithoutSSR = dynamic(() => import("@/components/game/App"), {ssr: false});

export default function Home() {
  return (
      <div className="flex w-full h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <AppWithoutSSR/>
        </Suspense>
        <div className="fixed top-0 right-0  w-64">
          <Chat/>
        </div>
      </div>
  )
}