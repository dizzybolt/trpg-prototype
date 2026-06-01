"use client"

import { useRouter } from "next/navigation"

import { monsters } from "../../lib/data"
import { useGameStore } from "../../lib/store"

export default function DungeonPage() {
  const router = useRouter()

  const setMonster = useGameStore((state) => state.setMonster)
  const clearLogs = useGameStore((state) => state.clearLogs)
  const addLog = useGameStore((state) => state.addLog)

  function moveForward() {
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)]

    clearLogs()
    addLog("미궁 안쪽으로 발을 내딛었다.")
    addLog(`${randomMonster.name}이(가) 나타났다!`)

    setMonster({ ...randomMonster })

    router.push("/battle")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">
        <h1 className="text-3xl font-bold">판도라 미궁</h1>

        <div className="border h-64 flex items-center justify-center text-zinc-400">
          어둡고 차가운 미궁의 입구
        </div>

        <button onClick={moveForward} className="border p-6">
          앞으로 이동
        </button>

        <button onClick={() => router.push("/town")} className="border p-4">
          마을로 돌아가기
        </button>
      </div>
    </main>
  )
}