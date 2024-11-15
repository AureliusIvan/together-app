'use client'

import {ReactNode, useEffect, useRef, useState} from 'react'

interface DraggableProps {
  children: ReactNode
}

export default function Draggable({children}: DraggableProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return
      setPosition(prevPosition => ({
        x: prevPosition.x + event.movementX,
        y: prevPosition.y + event.movementY
      }))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
      <div
          ref={ref}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
            zIndex: isDragging ? 2 : 1,
          }}
          onMouseDown={() => setIsDragging(true)}
      >
        {children}
      </div>
  )
}