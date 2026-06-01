"use client"

import { useRouter } from "next/navigation"

import { monsters } from "@/lib/data"
import { useGameStore } from "@/lib/store"

export default function DungeonPage() {
  const router = useRouter()

  const setMonster = useGameStore(
    (state) => state.setMonster
  )

  function moveForward() {
    const randomMonster =
      monsters[
        Math.floor(
          Math.random() *
            monsters.length
        )
      ]

    setMonster({
      ...randomMonster,
    })

    router.push("/battle")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          Pandora Maze
        </h1>

        <button
          onClick={moveForward}
          className="border p-6"
        >
          Move Forward
        </button>

      </div>

    </main>
  )
}