import { useEffect, useState } from 'react'

interface DiceProps {
  value: number
  isRolling: boolean
}

export default function Dice({ value, isRolling }: DiceProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1)
      }, 100)
      return () => clearInterval(interval)
    } else {
      setDisplayValue(value)
    }
  }, [isRolling, value])

  const getDots = () => {
    const dots = []
    const dotPositions: { [key: number]: string[] } = {
      1: ['top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
      2: ['top-4 left-4', 'bottom-4 right-4'],
      3: ['top-4 left-4', 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'bottom-4 right-4'],
      4: ['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'],
      5: ['top-4 left-4', 'top-4 right-4', 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', 'bottom-4 left-4', 'bottom-4 right-4'],
      6: ['top-4 left-4', 'top-4 right-4', 'top-1/2 left-4 -translate-y-1/2', 'top-1/2 right-4 -translate-y-1/2', 'bottom-4 left-4', 'bottom-4 right-4'],
    }
    
    dotPositions[displayValue]?.forEach((position, index) => {
      dots.push(
        <div
          key={index}
          className={`dice-dot ${position}`}
        />
      )
    })
    
    return dots
  }

  return (
    <div className="relative">
      <div
        className={`dice-face ${
          isRolling ? 'animate-spin-slow' : ''
        }`}
      >
        {getDots()}
      </div>
      {isRolling && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-xl animate-ping opacity-20"></div>
        </div>
      )}
    </div>
  )
}