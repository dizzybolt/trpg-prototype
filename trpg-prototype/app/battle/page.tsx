"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { processAutoBattleTurn } from "../../lib/battleEngine"
import { useGameStore } from "../../lib/store"

type BattleResult = "victory" | "defeat" | "escaped" | null

export default function BattlePage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setCharacter = useGameStore((state) => state.setCharacter)

  const monster = useGameStore((state) => state.monster)
  const setMonster = useGameStore((state) => state.setMonster)

  const logs = useGameStore((state) => state.logs)
  const addLog = useGameStore((state) => state.addLog)

  const [isRunning, setIsRunning] = useState(false)
  const [battleResult, setBattleResult] = useState<BattleResult>(null)

  useEffect(() => {
    if (!isRunning || battleResult || !character || !monster) return

    const timer = setTimeout(() => {
      const result = processAutoBattleTurn(character, monster)

      result.logs.forEach((log) => addLog(log))

      setCharacter(result.character)
      setMonster(result.monster)

      if (result.outcome === "victory") {
        setIsRunning(false)
        setBattleResult("victory")
      }

      if (result.outcome === "defeat") {
        setIsRunning(false)
        setBattleResult("defeat")
      }
    }, 900)

    return () => clearTimeout(timer)
  }, [
    isRunning,
    battleResult,
    character,
    monster,
    addLog,
    setCharacter,
    setMonster,
  ])

  if (battleResult) {
    return (
      <main className="game-page">
        <div className="game-container">
          <p className="text-sm text-slate-500">Battle Result</p>
          <h1 className="game-title">전투 결과</h1>

          <div className="game-panel space-y-4">
            <p className="text-xl font-bold text-amber-100">
              {battleResult === "victory" && "승리!"}
              {battleResult === "defeat" && "패배..."}
              {battleResult === "escaped" && "전투에서 이탈했다."}
            </p>

            <div className="game-log">
              {logs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>

            {battleResult !== "defeat" && (
              <button
                onClick={() => router.push("/dungeon")}
                className="game-button-primary"
              >
                계속 탐색
              </button>
            )}

            <button onClick={() => router.push("/town")} className="game-button">
              마을로 돌아가기
            </button>
          </div>
        </div>
      </main>
    )
  }

  if (!character || !monster) {
    return (
      <main className="game-page">
        <div className="game-container">
          <h1 className="game-title">전투</h1>

          <div className="game-panel space-y-4">
            <p className="text-slate-400">현재 진행 중인 전투가 없습니다.</p>

            <button onClick={() => router.push("/dungeon")} className="game-button">
              계속 탐색
            </button>

            <button onClick={() => router.push("/town")} className="game-button">
              마을로 돌아가기
            </button>
          </div>
        </div>
      </main>
    )
  }

  function startBattle() {
    setIsRunning(true)
  }

  function pauseBattle() {
    setIsRunning(false)
  }

  function escapeBattle() {
    if (!character) return

    addLog(`${character.name}은(는) 전투에서 이탈했다.`)
    setMonster(null)
    setIsRunning(false)
    setBattleResult("escaped")
  }

  return (
    <main className="game-page">
      <div className="game-container">
        <p className="text-sm text-slate-500">Auto Battle Simulation</p>
        <h1 className="game-title">전투</h1>

        <div className="game-panel flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">탐험가</p>
            <p className="text-xl font-bold text-amber-100">{character.name}</p>
            <p className="text-sm text-slate-400">
              HP {character.hp}/{character.maxHp}
            </p>
            <p className="text-sm text-slate-400">
              MP {character.mp}/{character.maxMp}
            </p>
            <p className="text-sm text-slate-400">
              포션 {character.potions ?? 0}개
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">적</p>
            <p className="text-xl font-bold text-red-200">{monster.name}</p>
            <p className="text-sm text-slate-400">
              HP {monster.hp}/{monster.maxHp}
            </p>
          </div>
        </div>

        <div className="game-panel-dark h-72 flex items-center justify-between px-8">
          <div className="text-center">
            <p className="text-6xl">🛡️</p>
            <p className="mt-2 text-amber-100">{character.name}</p>
          </div>

          <div className="text-center text-slate-500">
            {isRunning ? "BATTLE" : "READY"}
          </div>

          <div className="text-center">
            <p className="text-6xl">☠</p>
            <p className="mt-2 text-red-200">{monster.name}</p>
          </div>
        </div>

        <div className="game-log">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={startBattle}
            disabled={isRunning}
            className="game-button-primary disabled:opacity-40"
          >
            전투 시작
          </button>

          <button
            onClick={pauseBattle}
            disabled={!isRunning}
            className="game-button disabled:opacity-40"
          >
            일시정지
          </button>

          <button onClick={escapeBattle} className="game-button">
            도주
          </button>

          <button onClick={() => router.push("/town")} className="game-button">
            마을로 돌아가기
          </button>
        </div>
      </div>
    </main>
  )
}