"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import MiniMap from "../../components/dungeon/MiniMap"
import { useGameStore } from "../../lib/store"
import { generateMonster } from "../../lib/monster/monsterGenerator"
import {
  createDungeonMap,
  getDirectionLabel,
  moveForward as moveDungeonForward,
  turnLeft as turnDungeonLeft,
  turnRight as turnDungeonRight,
} from "../../lib/dungeon/dungeonMapEngine"

export default function DungeonPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setMonster = useGameStore((state) => state.setMonster)
  const clearLogs = useGameStore((state) => state.clearLogs)
  const addLog = useGameStore((state) => state.addLog)

  const dungeonMap = useGameStore((state) => state.dungeonMap)
  const setDungeonMap = useGameStore((state) => state.setDungeonMap)

  const [exploreLogs, setExploreLogs] = useState<string[]>([
    "판도라 미궁 1층에 진입했다.",
    "주변을 살피며 천천히 전진할 준비를 한다.",
  ])
  const [canUseStairs, setCanUseStairs] = useState(false)

  useEffect(() => {
    if (!dungeonMap) {
      setDungeonMap(createDungeonMap())
    }
  }, [dungeonMap, setDungeonMap])

  if (!character) {
    return (
      <main className="game-page">
        <div className="game-container">
          <h1 className="game-title">판도라 미궁</h1>

          <div className="game-panel space-y-4">
            <p className="text-slate-400">캐릭터 정보가 없습니다.</p>

            <button
              onClick={() => router.push("/character")}
              className="game-button"
            >
              캐릭터 생성으로 이동
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!dungeonMap) {
    return (
      <main className="game-page">
        <div className="game-container">
          <h1 className="game-title">판도라 미궁</h1>
          <div className="game-panel">
            <p className="text-slate-400">던전 지도를 불러오는 중...</p>
          </div>
        </div>
      </main>
    )
  }

  function addExploreLog(message: string) {
    setExploreLogs((prev) => [...prev.slice(-7), message])
  }

  function handleTurnLeft() {
    const map = dungeonMap
    if (!map) return

    const nextMap = turnDungeonLeft(map)

    setDungeonMap(nextMap)
    addExploreLog(`${getDirectionLabel(nextMap.player.direction)} 방향으로 몸을 돌렸다.`)
  }

  function handleTurnRight() {
    const map = dungeonMap
    if (!map) return

    const nextMap = turnDungeonRight(map)

    setDungeonMap(nextMap)
    addExploreLog(`${getDirectionLabel(nextMap.player.direction)} 방향으로 몸을 돌렸다.`)
  }

  function handleMoveForward() {
    const map = dungeonMap
    if (!map) return

    setCanUseStairs(false)
    const result = moveDungeonForward(map)

    setDungeonMap(result.map)
    addExploreLog(result.message)

    setDungeonMap(result.map)
    addExploreLog(result.message)

    if (!result.moved) return

    if (result.tile.type === "stairs_down") {
      addExploreLog("아래층으로 내려가는 계단을 발견했다.")
      setCanUseStairs(true)
      return
    }

    if (result.tile.type === "treasure") {
      addExploreLog("낡은 보물상자를 발견했다. 아직 열 수는 없다.")
      return
    }

    if (result.tile.type === "trap") {
      addExploreLog("바닥에 수상한 흔적이 보인다. 함정일지도 모른다.")
      return
    }

    if (Math.random() < 0.45) {
      const randomMonster = generateMonster("pandora_maze")

      clearLogs()
      addLog("어둠 속에서 기척이 느껴진다.")
      addLog(`${randomMonster.name}이(가) 나타났다!`)

      setMonster(randomMonster)
      router.push("/battle")
      return
    }

    addExploreLog("주변은 조용하다.")
  }

  function handleGoDownStairs() {
    if (!dungeonMap) return

    const nextFloor = dungeonMap.floor + 1
    const nextMap = createDungeonMap(nextFloor)

    setDungeonMap(nextMap)
    setCanUseStairs(false)

    setExploreLogs([
      `판도라 미궁 ${nextFloor}층에 도착했다.`,
      "계단 위쪽에서 희미한 냉기가 흘러내린다.",
    ])
  }
  
  return (
    <main className="game-page">
      <div className="game-container">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Dungeon Exploration</p>
          <h1 className="game-title">판도라 미궁</h1>
        </div>

        <div className="game-panel flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">탐험가</p>
            <p className="font-bold text-lg">{character.name}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">현재 방향</p>
            <p className="font-bold text-amber-200">
              {getDirectionLabel(dungeonMap.player.direction)}
            </p>
          </div>
        </div>

        <MiniMap map={dungeonMap} />

        <div className="game-panel-dark h-40 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-black/70" />

          <div className="relative z-10 space-y-2">
            <p className="text-4xl text-slate-500">▲</p>
            <p className="text-lg font-semibold">어두운 미궁의 통로</p>
            <p className="text-sm text-slate-500">
              현재 좌표: X {dungeonMap.player.x}, Y {dungeonMap.player.y}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button onClick={handleTurnLeft} className="game-button">
            ◀
          </button>

          <button onClick={handleMoveForward} className="game-button-primary">
            ▲
          </button>

          <button onClick={handleTurnRight} className="game-button">
            ▶
          </button>
        </div>

        {canUseStairs && (
          <button onClick={handleGoDownStairs} className="game-button-primary">
            아래층으로 내려가기
          </button>
        )}

        <button onClick={() => router.push("/town")} className="game-button">
          마을로 돌아가기
        </button>

        <div className="game-log">
          {exploreLogs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </main>
  )
}