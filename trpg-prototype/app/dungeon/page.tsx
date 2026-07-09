"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import DungeonView from "../../components/dungeon/DungeonView"
import GameLog from "../../components/ui/GameLog"
import PartyHUD from "../../components/ui/PartyHUD"

import { useGameStore } from "../../lib/store"
import { generateMonster } from "../../lib/monster/monsterGenerator"
import {
  createDungeonMap,
  getDirectionLabel,
  moveForward as moveDungeonForward,
  turnLeft as turnDungeonLeft,
  turnRight as turnDungeonRight,
} from "../../lib/dungeon/dungeonMapEngine"

type LogEntry = {
  text: string
  type?: "normal" | "battle" | "story" | "heal"
}

export default function DungeonPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setMonster = useGameStore((state) => state.setMonster)
  const clearLogs = useGameStore((state) => state.clearLogs)
  const addLog = useGameStore((state) => state.addLog)

  const dungeonMap = useGameStore((state) => state.dungeonMap)
  const setDungeonMap = useGameStore((state) => state.setDungeonMap)

  const [exploreLogs, setExploreLogs] = useState<LogEntry[]>([
    { text: "판도라 미궁 1층에 진입했다.", type: "story" },
    { text: "주변을 살피며 천천히 전진할 준비를 한다." },
  ])

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

  function addExploreLog(text: string, type: LogEntry["type"] = "normal") {
    setExploreLogs((prev) => [...prev.slice(-7), { text, type }])
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

    const result = moveDungeonForward(map)

    setDungeonMap(result.map)
    addExploreLog(result.message)

    if (!result.moved) return

    if (result.tile.type === "stairs_down") {
      const nextFloor = result.map.floor + 1
      const nextMap = createDungeonMap(nextFloor)

      setDungeonMap(nextMap)
      setExploreLogs([
        {
          text: `판도라 미궁 ${nextFloor}층에 진입했다.`,
          type: "story",
        },
        {
          text: "뒤쪽에는 위층으로 돌아가는 계단이 있다.",
          type: "normal",
        },
      ])

      return
    }

    if (result.tile.type === "stairs_up") {
      if (result.map.floor === 1) {
        addExploreLog("마을로 돌아가는 입구를 발견했다.", "story")
        router.push("/town")
        return
      }

      const prevFloor = result.map.floor - 1
      const prevMap = createDungeonMap(prevFloor)

      setDungeonMap(prevMap)
      setExploreLogs([
        {
          text: `판도라 미궁 ${prevFloor}층으로 돌아왔다.`,
          type: "story",
        },
        {
          text: "뒤쪽에는 아래층으로 내려가는 계단이 있다.",
          type: "normal",
        },
      ])

      return
    }

    if (result.tile.type === "treasure") {
      addExploreLog("낡은 보물상자를 발견했다. 아직 열 수는 없다.", "story")
      return
    }

    if (result.tile.type === "trap") {
      addExploreLog("바닥에 수상한 흔적이 보인다. 함정일지도 모른다.", "battle")
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

  function handleInspect() {
    addExploreLog("주변을 자세히 살펴보았다.")
  }

  function handleInteract() {
    addExploreLog("상호작용할 수 있는 대상이 없다.")
  }

  return (
    <main className="game-page">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4">
        <header className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">Dungeon Exploration</p>
            <h1 className="game-title">판도라 미궁</h1>
          </div>

          <div className="text-right text-sm text-slate-400">
            <p>Floor {dungeonMap.floor}</p>
            <p>방향: {getDirectionLabel(dungeonMap.player.direction)}</p>
          </div>
        </header>

        <section className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            <DungeonView
              map={dungeonMap}
              onTurnLeft={handleTurnLeft}
              onMoveForward={handleMoveForward}
              onTurnRight={handleTurnRight}
              onInspect={handleInspect}
              onInteract={handleInteract}
            />

            <GameLog title="탐험 기록" logs={exploreLogs} />
          </div>

          <PartyHUD members={[character]} />
        </section>
      </div>
    </main>
  )
}