"use client"

import { useRouter } from "next/navigation"

import { randomRange } from "../../lib/engine"
import { useGameStore } from "../../lib/store"

export default function BattlePage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setCharacter = useGameStore((state) => state.setCharacter)

  const monster = useGameStore((state) => state.monster)
  const setMonster = useGameStore((state) => state.setMonster)

  const logs = useGameStore((state) => state.logs)
  const addLog = useGameStore((state) => state.addLog)

  if (!character || !monster) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Battle</h1>
          <p>No battle data.</p>
          <button
            onClick={() => router.push("/town")}
            className="border p-4"
          >
            Return to Town
          </button>
        </div>
      </main>
    )
  }

  const currentCharacter = character
  const currentMonster = monster

  function attack() {
    const damage =
      randomRange(1, 6) + Math.floor(currentCharacter.str / 3)

    const newMonsterHp = currentMonster.hp - damage

    addLog(`You dealt ${damage} damage!`)

    if (newMonsterHp <= 0) {
      addLog(`${currentMonster.name} defeated!`)

      setCharacter({
        ...currentCharacter,
        exp: currentCharacter.exp + currentMonster.exp,
        gold: currentCharacter.gold + currentMonster.gold,
      })

      setMonster(null)

      setTimeout(() => {
        router.push("/town")
      }, 1000)

      return
    }

    const monsterDamage = randomRange(
      currentMonster.attackMin,
      currentMonster.attackMax
    )

    const newPlayerHp = currentCharacter.hp - monsterDamage

    addLog(`${currentMonster.name} dealt ${monsterDamage} damage!`)

    if (newPlayerHp <= 0) {
      addLog("You died.")

      setCharacter({
        ...currentCharacter,
        hp: 0,
      })

      return
    }

    setMonster({
      ...currentMonster,
      hp: newMonsterHp,
    })

    setCharacter({
      ...currentCharacter,
      hp: newPlayerHp,
    })
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Battle</h1>

        <div className="border p-4">
          <p>{currentMonster.name}</p>
          <p>
            HP: {currentMonster.hp}/{currentMonster.maxHp}
          </p>
        </div>

        <div className="border p-4">
          <p>{currentCharacter.name}</p>
          <p>
            HP: {currentCharacter.hp}/{currentCharacter.maxHp}
          </p>
        </div>

        <button onClick={attack} className="border p-4">
          Attack
        </button>

        <button
          onClick={() => router.push("/town")}
          className="border p-4"
        >
          Run
        </button>

        <div className="border p-4 h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </main>
  )
}