"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { monsters } from "../../lib/data"
import { useGameStore } from "../../lib/store"

const directions = ["북쪽", "동쪽", "남쪽", "서쪽"]

export default function DungeonPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setMonster = useGameStore((state) => state.setMonster)
  const clearLogs = useGameStore((state) => state.clearLogs)
  const addLog = useGameStore((state) => state.addLog)

  const [directionIndex, setDirectionIndex] = useState(0)
  const [exploreLogs, setExploreLogs] = useState<string[]>([
    "판도라 미궁 입구에 도착했다.",
  ])

  if (!character) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <h1 className="text-3xl font-bold">판도라 미궁</h1>
          <p>캐릭터 정보가 없습니다.</p>
          <button onClick={() => router.push("/character")} className="border p-4">
            캐릭터 생성으로 이동
          </button>
        </div>
      </main>
    )
  }

  function addExploreLog(message: string) {
    setExploreLogs((prev) => [...prev.slice(-6), message])
  }

  function turnLeft() {
    const nextIndex = (directionIndex + 3) % 4
    setDirectionIndex(nextIndex)
    addExploreLog(`${directions[nextIndex]}을(를) 바라보았다.`)
  }

  function turnRight() {
    const nextIndex = (directionIndex + 1) % 4
    setDirectionIndex(nextIndex)
    addExploreLog(`${directions[nextIndex]}을(를) 바라보았다.`)
  }

  function moveForward() {
    const encounterChance = Math.random()

    addExploreLog(`${directions[directionIndex]}으로 한 칸 전진했다.`)

    if (encounterChance < 0.7) {
      const randomMonster = monsters[Math.floor(Math.random() * monsters.length)]

      clearLogs()
      addLog("미궁 안쪽에서 기척이 느껴진다.")
      addLog(`${randomMonster.name}이(가) 나타났다!`)

      setMonster({ ...randomMonster })
      router.push("/battle")
      return
    }

    addExploreLog("주변은 조용하다.")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold">판도라 미궁</h1>

        <div className="border p-4 space-y-2">
          <p>탐험가: {character.name}</p>
          <p>
            HP: {character.hp}/{character.maxHp}
          </p>
          <p>현재 방향: {directions[directionIndex]}</p>
        </div>

        <div className="border h-56 flex items-center justify-center bg-zinc-950">
          <div className="text-center space-y-2">
            <p className="text-5xl">▲</p>
            <p className="text-zinc-400">어둡고 차가운 미궁의 통로</p>
            <p className="text-sm text-zinc-500">{directions[directionIndex]} 방향</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button onClick={turnLeft} className="border p-4">
            ← 좌회전
          </button>

          <button onClick={moveForward} className="border p-4">
            ↑ 전진
          </button>

          <button onClick={turnRight} className="border p-4">
            우회전 →
          </button>
        </div>

        <button onClick={() => router.push("/town")} className="border p-4">
          마을로 돌아가기
        </button>

        <div className="border p-4 h-48 overflow-y-auto text-sm space-y-1">
          {exploreLogs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </main>
  )
}