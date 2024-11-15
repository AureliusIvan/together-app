'use client'

import React, {createContext, useEffect, useState} from 'react'
import io, {Socket} from 'socket.io-client'

export const SocketContext = createContext<Socket | null>(null)

export function SocketProvider({children}: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URI, {transports: ['websocket']})
    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [])

  return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
