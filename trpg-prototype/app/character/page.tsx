"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { jobs, races } from "@/lib/data"
import { rollStat } from "@/lib/engine"
import { useGameStore } from "@/lib/store"

export default function CharacterPage() {
  const router = useRouter()

  const setCharacter = useGameStore(
    (state) => state.setCharacter
  )

  const [name, setName] = useState("")

  const [raceId, setRaceId] = useState("human")
  const [jobId, setJobId] = useState("warrior")

  const [stats, setStats] = useState({
    str: rollStat(),
    dex: rollStat(),
    int: rollStat(),
    vit: rollStat(),
  })

  function reroll() {
    setStats({
      str: rollStat(),
      dex: rollStat(),
      int: rollStat(),
      vit: rollStat(),
    })
  }

  function createCharacter() {
    const race = races.find((r) => r.id === raceId)!
    const job = jobs.find((j) => j.id === jobId)!

    const finalStr = stats.str + race.str
    const finalDex = stats.dex + race.dex
    const finalInt = stats.int + race.int
    const finalVit = stats.vit + race.vit

    const maxHp =
      finalVit * 2 + job.hpBonus

    const maxMp =
      finalInt * 2 + job.mpBonus

    setCharacter({
      name,

      race,
      job,

      level: 1,
      exp: 0,
      gold: 0,

      str: finalStr,
      dex: finalDex,
      int: finalInt,
      vit: finalVit,

      hp: maxHp,
      maxHp,

      mp: maxMp,
      maxMp,
    })

    router.push("/town")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          Character Creation
        </h1>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Character Name"
          className="bg-zinc-900 border p-3"
        />

        <select
          value={raceId}
          onChange={(e) =>
            setRaceId(e.target.value)
          }
          className="bg-zinc-900 border p-3"
        >
          {races.map((race) => (
            <option
              key={race.id}
              value={race.id}
            >
              {race.name}
            </option>
          ))}
        </select>

        <select
          value={jobId}
          onChange={(e) =>
            setJobId(e.target.value)
          }
          className="bg-zinc-900 border p-3"
        >
          {jobs.map((job) => (
            <option
              key={job.id}
              value={job.id}
            >
              {job.name}
            </option>
          ))}
        </select>

        <div className="border p-4 space-y-2">
          <p>STR: {stats.str}</p>
          <p>DEX: {stats.dex}</p>
          <p>INT: {stats.int}</p>
          <p>VIT: {stats.vit}</p>
        </div>

        <button
          onClick={reroll}
          className="border p-3"
        >
          Reroll
        </button>

        <button
          onClick={createCharacter}
          className="bg-white text-black p-3 font-bold"
        >
          Start Game
        </button>

      </div>
    </main>
  )
}