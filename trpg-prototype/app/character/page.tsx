"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { jobs, races } from "../../lib/data"
import { rollStat } from "../../lib/engine"
import { useGameStore } from "../../lib/store"

export default function CharacterPage() {
  const router = useRouter()

  const setCharacter = useGameStore(
    (state) => state.setCharacter
  )

  const clearLogs = useGameStore(
    (state) => state.clearLogs
  )

  const [mounted, setMounted] = useState(false)

  const [name, setName] = useState("")

  const [raceId, setRaceId] =
    useState("human")

  const [jobId, setJobId] =
    useState("warrior")

  const [stats, setStats] = useState({
    str: 0,
    dex: 0,
    int: 0,
    vit: 0,
  })

  useEffect(() => {
    reroll()
    setMounted(true)
  }, [])

  function reroll() {
    setStats({
      str: rollStat(),
      dex: rollStat(),
      int: rollStat(),
      vit: rollStat(),
    })
  }

  function createCharacter() {
    const race = races.find(
      (r) => r.id === raceId
    )!

    const job = jobs.find(
      (j) => j.id === jobId
    )!

    const finalStr =
      stats.str + race.str

    const finalDex =
      stats.dex + race.dex

    const finalInt =
      stats.int + race.int

    const finalVit =
      stats.vit + race.vit

    const maxHp =
      finalVit * 2 + job.hpBonus

    const maxMp =
      finalInt * 2 + job.mpBonus

    clearLogs()

    setCharacter({
      name:
        name || "이름 없는 모험가",

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

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          캐릭터 생성
        </h1>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="캐릭터 이름"
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

          <p>
            힘 STR:
            {" "}
            {stats.str}
          </p>

          <p>
            민첩 DEX:
            {" "}
            {stats.dex}
          </p>

          <p>
            지능 INT:
            {" "}
            {stats.int}
          </p>

          <p>
            건강 VIT:
            {" "}
            {stats.vit}
          </p>

        </div>

        <button
          onClick={reroll}
          className="border p-3"
        >
          능력치 다시 굴리기
        </button>

        <button
          onClick={createCharacter}
          className="bg-white text-black p-3 font-bold"
        >
          모험 시작
        </button>

      </div>

    </main>
  )
}