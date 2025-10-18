'use client'

import { useState } from 'react'
import Dice from './Dice'
import { rollDice, sleep } from '../lib/utils'

export default function DiceRoller() {
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [history, setHistory] = useState<Array<{ dice1: number; dice2: number; sum: number; timestamp: string }>>([])

  const handleRoll = async () => {
    if (isRolling) return
    
    setIsRolling(true)
    
    await sleep(1000)
    
    const newDice1 = rollDice()
    const newDice2 = rollDice()
    
    setDice1(newDice1)
    setDice2(newDice2)
    
    const newRoll = {
      dice1: newDice1,
      dice2: newDice2,
      sum: newDice1 + newDice2,
      timestamp: new Date().toLocaleTimeString(),
    }
    
    setHistory(prev => [newRoll, ...prev].slice(0, 10))
    setIsRolling(false)
  }

  const currentSum = dice1 + dice2

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          Dice Roller
        </h1>
        <p className="text-xl text-gray-300">
          Roll the dice and test your luck!
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8">
        <div className="flex justify-center items-center gap-8 mb-8">
          <Dice value={dice1} isRolling={isRolling} />
          <div className="text-4xl font-bold text-yellow-400">+</div>
          <Dice value={dice2} isRolling={isRolling} />
        </div>

        <div className="text-center mb-8">
          <div className="text-2xl text-gray-300 mb-2">Total</div>
          <div className="text-6xl font-bold text-white">
            {currentSum}
          </div>
        </div>

        <button
          onClick={handleRoll}
          disabled={isRolling}
          className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all transform ${
            isRolling
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:scale-105 hover:shadow-xl active:scale-95'
          }`}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      {history.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Roll History</h2>
          <div className="space-y-3">
            {history.map((roll, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-gray-400">#{history.length - index}</span>
                  <div className="flex gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded font-mono">
                      {roll.dice1}
                    </span>
                    <span className="text-gray-400">+</span>
                    <span className="bg-white/20 px-3 py-1 rounded font-mono">
                      {roll.dice2}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-yellow-400">
                    = {roll.sum}
                  </span>
                  <span className="text-sm text-gray-400">
                    {roll.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}