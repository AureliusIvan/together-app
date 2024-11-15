'use client'

import {useRef, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Mic, Square, X} from 'lucide-react'
import Draggable from './draggable'

interface SoundRecorderProps {
  onClose: () => void
}

export default function SoundRecorder({onClose}: SoundRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true})
      mediaRecorderRef.current = new MediaRecorder(stream)
      const chunks: Blob[] = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, {type: 'audio/webm'})
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing the microphone:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
      <Draggable>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Sound Recorder</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4"/>
            </Button>
          </div>
          <div className="space-y-2">
            <Button onClick={isRecording ? stopRecording : startRecording} className="w-full">
              {isRecording ? <Square className="mr-2 h-4 w-4"/> : <Mic className="mr-2 h-4 w-4"/>}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            {audioUrl && (
                <audio controls src={audioUrl} className="w-full"/>
            )}
          </div>
        </div>
      </Draggable>
  )
}