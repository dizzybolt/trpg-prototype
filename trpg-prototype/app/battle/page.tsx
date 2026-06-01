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
          <h1 className="text-3xl font-bold">전투 종료</h1>

          <p>현재 진행 중인 전투가 없습니다.</p>

          <button onClick={() => router.push("/dungeon")} className="border p-4">
            계속 탐색
          </button>

          <button onClick={() => router.push("/town")} className="border p-4">
            마을로 돌아가기
          </button>
        </div>
      </main>
    )
  }

  const currentCharacter = character
  const currentMonster = monster

  const isPlayerDead = currentCharacter.hp <= 0

  function attack() {
    if (isPlayerDead) return

    const damage = randomRange(1, 6) + Math.floor(currentCharacter.str / 3)
    const newMonsterHp = currentMonster.hp - damage

    addLog(`${currentCharacter.name}의 공격!`)
    addLog(`${currentMonster.name}에게 ${damage} 피해를 입혔다.`)

    if (newMonsterHp <= 0) {
      addLog(`${currentMonster.name}을(를) 쓰러뜨렸다!`)
      addLog(`${currentMonster.exp} 경험치와 ${currentMonster.gold}G를 획득했다.`)

      setCharacter({
        ...currentCharacter,
        exp: currentCharacter.exp + currentMonster.exp,
        gold: currentCharacter.gold + currentMonster.gold,
      })

      setMonster(null)
      return
    }

    const monsterDamage = randomRange(
      currentMonster.attackMin,
      currentMonster.attackMax
    )

    const newPlayerHp = currentCharacter.hp - monsterDamage

    addLog(`${currentMonster.name}의 반격!`)
    addLog(`${currentCharacter.name}은(는) ${monsterDamage} 피해를 입었다.`)

    if (newPlayerHp <= 0) {
      addLog(`${currentCharacter.name}은(는) 쓰러졌다.`)

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

  function runAway() {
    addLog(`${currentCharacter.name}은(는) 전투에서 도망쳤다.`)
    setMonster(null)
    router.push("/dungeon")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold">전투</h1>

        <div className="border p-4">
          <p className="text-xl font-bold">{currentMonster.name}</p>
          <p>
            HP: {currentMonster.hp}/{currentMonster.maxHp}
          </p>
        </div>

        <div className="border p-4">
          <p>{currentCharacter.name}</p>
          <p>
            HP: {currentCharacter.hp}/{currentCharacter.maxHp}
          </p>
          <p>
            MP: {currentCharacter.mp}/{currentCharacter.maxMp}
          </p>
        </div>

        <button
          onClick={attack}
          disabled={isPlayerDead}
          className="border p-4 disabled:opacity-40"
        >
          공격
        </button>

        <button
          onClick={runAway}
          disabled={isPlayerDead}
          className="border p-4 disabled:opacity-40"
        >
          도주
        </button>

        {isPlayerDead && (
          <button onClick={() => router.push("/town")} className="border p-4 text-red-300">
            쓰러진 상태로 마을로 돌아가기
          </button>
        )}

        <div className="border p-4 h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </main>
  )
}