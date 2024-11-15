'use client'

import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Camera, Video, Mic } from 'lucide-react'
import CameraComponent from './camera-component'
import VideoPlayer from './video-player'
import SoundRecorder from './sound-recorder'

export function BottomMenu() {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [videos, setVideos] = useState<string[]>([])
  const [showRecorder, setShowRecorder] = useState(false)

  const handleCameraToggle = () => setIsCameraOn(!isCameraOn)
  const handleVideoCapture = (videoBlob: Blob) => {
    const videoUrl = URL.createObjectURL(videoBlob)
    setVideos([...videos, videoUrl])
  }
  const handleRecorderToggle = () => setShowRecorder(!showRecorder)

  return (
      <>
        <section className={cn(`bg-black w-full h-16 fixed bottom-0 p-1 flex justify-center items-center gap-2.5`)}>
          <Button
              className={cn("button", isCameraOn && "bg-primary-foreground text-primary")}
              onClick={handleCameraToggle}
          >
            <Camera className="mr-2 h-4 w-4" /> {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
          </Button>
          <Button className="button" onClick={() => setVideos([...videos, ''])}>
            <Video className="mr-2 h-4 w-4" /> Add Video
          </Button>
          <Button className="button" onClick={handleRecorderToggle}>
            <Mic className="mr-2 h-4 w-4" /> Record Sound
          </Button>
        </section>
        {isCameraOn && <CameraComponent onCapture={handleVideoCapture} onClose={handleCameraToggle} />}
        {videos.map((video, index) => (
            <VideoPlayer key={index} src={video} onClose={() => setVideos(videos.filter((_, i) => i !== index))} />
        ))}
        {showRecorder && <SoundRecorder onClose={() => setShowRecorder(false)} />}
      </>
  )
}