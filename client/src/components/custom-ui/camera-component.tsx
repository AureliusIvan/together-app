'use client'

import {useEffect, useRef, useState} from 'react'
import {Button} from "@/components/ui/button"
import {X} from 'lucide-react'
import Draggable from './draggable'

interface CameraComponentProps {
  onCapture: (blob: Blob) => void
  onClose: () => void
}

export default function CameraComponent({onCapture, onClose}: CameraComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    let stream: MediaStream | null = null

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({video: true})
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing the camera:", err)
      }
    }

    setupCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      mediaRecorderRef.current = new MediaRecorder(videoRef.current.srcObject as MediaStream)
      const chunks: Blob[] = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, {type: 'video/webm'})
        onCapture(blob)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
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
            <h3 className="text-lg font-semibold">Camera</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4"/>
            </Button>
          </div>
          <video ref={videoRef} autoPlay muted className="w-full max-w-sm mb-2"/>
          <Button onClick={isRecording ? stopRecording : startRecording} className="w-full">
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
        </div>
      </Draggable>
  )
}