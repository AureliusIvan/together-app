'use client'

import React, {useEffect, useState} from 'react'
import {useSocket} from '@/hooks/useSocket'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {ScrollArea} from '@/components/ui/scroll-area'

type Message = {
  id: string
  sender: string
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('chat message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message])
      })
    }
  }, [socket])

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      socket.emit('chat message', inputMessage)
      setInputMessage('')
    }
  }

  return (
      <div className="w-64 h-96 bg-white rounded-lg shadow-md flex flex-col">
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
              <div key={message.id} className="mb-2">
                <span className="font-bold">{message.sender}: </span>
                {message.content}
              </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDownCapture={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="mb-2"
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
  )
}