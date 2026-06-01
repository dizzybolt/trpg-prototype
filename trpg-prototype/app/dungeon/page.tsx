"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { monsters } from "../../lib/data"
import { useGameStore } from "../../lib/store"

const directions = ["북쪽", "동쪽", "남쪽", "서쪽"]

export default function DungeonPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)

  const setMonster = useGameStore(
    (state) => state.setMonster
  )

  const clearLogs = useGameStore(
    (state) => state.clearLogs
  )

  const addLog = useGameStore(
    (state) => state.addLog
  )

  const [directionIndex, setDirectionIndex] =
    useState(0)

  const [exploreLogs, setExploreLogs] =
    useState<string[]>([
      "판도라 미궁 입구에 도착했다.",
    ])

  if (!character) {
    return (
      <main className="game-page">
        <div className="game-container">

          <h1 className="game-title">
            판도라 미궁
          </h1>

          <div className="game-panel space-y-4">

            <p className="text-slate-400">
              캐릭터 정보가 없습니다.
            </p>

            <button
              onClick={() =>
                router.push("/character")
              }
              className="game-button"
            >
              캐릭터 생성으로 이동
            </button>

          </div>

        </div>
      </main>
    )
  }

  function addExploreLog(message: string) {
    setExploreLogs((prev) => [
      ...prev.slice(-6),
      message,
    ])
  }

  function turnLeft() {
    const nextIndex =
      (directionIndex + 3) % 4

    setDirectionIndex(nextIndex)

    addExploreLog(
      `${directions[nextIndex]} 방향으로 몸을 돌렸다.`
    )
  }

  function turnRight() {
    const nextIndex =
      (directionIndex + 1) % 4

    setDirectionIndex(nextIndex)

    addExploreLog(
      `${directions[nextIndex]} 방향으로 몸을 돌렸다.`
    )
  }

  function moveForward() {
    const encounterChance =
      Math.random()

    addExploreLog(
      `${directions[directionIndex]} 방향으로 전진했다.`
    )

    if (encounterChance < 0.7) {
      const randomMonster =
        monsters[
          Math.floor(
            Math.random() *
              monsters.length
          )
        ]

      clearLogs()

      addLog(
        "어둠 속에서 기척이 느껴진다."
      )

      addLog(
        `${randomMonster.name}이(가) 나타났다!`
      )

      setMonster({
        ...randomMonster,
      })

      router.push("/battle")

      return
    }

    addExploreLog(
      "주변은 조용하다."
    )
  }

  return (
    <main className="game-page">

      <div className="game-container">

        <div className="space-y-2">

          <p className="text-sm text-slate-500">
            Dungeon Exploration
          </p>

          <h1 className="game-title">
            판도라 미궁
          </h1>

        </div>

        <div className="game-panel flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-500">
              탐험가
            </p>

            <p className="font-bold text-lg">
              {character.name}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs text-slate-500">
              현재 방향
            </p>

            <p className="font-bold text-amber-200">
              {directions[directionIndex]}
            </p>

          </div>

        </div>

        <div className="game-panel-dark h-72 flex flex-col items-center justify-center text-center relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-black/70" />

          <div className="relative z-10 space-y-4">

            <p className="text-6xl text-slate-500">
              ▲
            </p>

            <div>

              <p className="text-lg font-semibold">
                어두운 미궁의 통로
              </p>

              <p className="text-sm text-slate-500 mt-2">
                희미한 냉기가 통로를 따라 흐른다.
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={turnLeft}
            className="game-button"
          >
            ← 좌회전
          </button>

          <button
            onClick={moveForward}
            className="game-button-primary"
          >
            ↑ 전진
          </button>

          <button
            onClick={turnRight}
            className="game-button"
          >
            우회전 →
          </button>

        </div>

        <button
          onClick={() =>
            router.push("/town")
          }
          className="game-button"
        >
          마을로 돌아가기
        </button>

        <div className="game-log">

          {exploreLogs.map(
            (log, index) => (
              <p key={index}>
                {log}
              </p>
            )
          )}

        </div>

      </div>

    </main>
  )
}