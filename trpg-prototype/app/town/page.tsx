"use client"

import Link from "next/link"

import { useGameStore } from "@/lib/store"

export default function TownPage() {
  const character = useGameStore(
    (state) => state.character
  )

  if (!character) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          Academy Town
        </h1>

        <div className="border p-4 space-y-2">

          <p>
            {character.name}
          </p>

          <p>
            Lv.{character.level}
          </p>

          <p>
            HP:
            {" "}
            {character.hp}
            /
            {character.maxHp}
          </p>

          <p>
            MP:
            {" "}
            {character.mp}
            /
            {character.maxMp}
          </p>

          <p>
            Gold:
            {" "}
            {character.gold}
          </p>

        </div>

        <Link
          href="/dungeon"
          className="border p-4 text-center"
        >
          Enter Dungeon
        </Link>

      </div>

    </main>
  )
}