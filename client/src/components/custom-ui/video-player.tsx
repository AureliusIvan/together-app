'use client'

import {Button} from "@/components/ui/button"
import {X} from 'lucide-react'
import Draggable from './draggable'

interface VideoPlayerProps {
  src: string
  onClose: () => void
}

export default function VideoPlayer({src, onClose}: VideoPlayerProps) {
  return (
      <Draggable>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Video Player</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4"/>
            </Button>
          </div>
          <video src={src} controls className="w-full max-w-sm"/>
        </div>
      </Draggable>
  )
}