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
      potions: 3,

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
    <main className="game-page">
      <div className="game-container">

        <div className="space-y-2">
          <p className="text-sm text-slate-500">
            Adventurer Registration
          </p>

          <h1 className="game-title">
            캐릭터 생성
          </h1>
        </div>

        <div className="game-panel space-y-4">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="캐릭터 이름"
            className="game-input w-full"
          />

          <div className="space-y-2">

            <p className="text-sm text-slate-400">
              종족
            </p>

            <select
              value={raceId}
              onChange={(e) =>
                setRaceId(e.target.value)
              }
              className="game-input w-full"
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

          </div>

          <div className="space-y-2">

            <p className="text-sm text-slate-400">
              직업
            </p>

            <select
              value={jobId}
              onChange={(e) =>
                setJobId(e.target.value)
              }
              className="game-input w-full"
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

          </div>

        </div>

        <div className="game-panel">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-amber-200">
              능력치
            </h2>

            <button
              onClick={reroll}
              className="game-button px-4 py-2 text-sm"
            >
              다시 굴리기
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">
                힘 STR
              </p>

              <p className="text-2xl font-bold">
                {stats.str}
              </p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">
                민첩 DEX
              </p>

              <p className="text-2xl font-bold">
                {stats.dex}
              </p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">
                지능 INT
              </p>

              <p className="text-2xl font-bold">
                {stats.int}
              </p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">
                건강 VIT
              </p>

              <p className="text-2xl font-bold">
                {stats.vit}
              </p>
            </div>

          </div>

        </div>

        <button
          onClick={createCharacter}
          className="game-button-primary"
        >
          모험 시작
        </button>

      </div>
    </main>
  )
}