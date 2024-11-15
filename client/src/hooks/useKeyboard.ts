import {useEffect, useState} from 'react'

export function useKeyboard() {
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.hasOwnProperty(e.code)) {
        setKeys((prevKeys) => ({...prevKeys, [e.code]: true}))
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.hasOwnProperty(e.code)) {
        setKeys((prevKeys) => ({...prevKeys, [e.code]: false}))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keys
}