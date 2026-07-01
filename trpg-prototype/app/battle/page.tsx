"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { processAutoBattleTurn } from "../../lib/battleEngine"
import { useGameStore } from "../../lib/store"

import ActionButton from "../../components/ui/ActionButton"
import BattleLog from "../../components/ui/BattleLog"
import BattleHUD from "../../components/battle/BattleHUD"
import BattleScene from "../../components/battle/BattleScene"

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

            <BattleLog logs={logs} maxHeight="h-72" />

            {battleResult !== "defeat" && (
              <ActionButton
                variant="primary"
                onClick={() => router.push("/dungeon")}
              >
                계속 탐색
              </ActionButton>
            )}

            <ActionButton onClick={() => router.push("/town")}>
              마을로 돌아가기
            </ActionButton>
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

            <ActionButton onClick={() => router.push("/dungeon")}>
              계속 탐색
            </ActionButton>

            <ActionButton onClick={() => router.push("/town")}>
              마을로 돌아가기
            </ActionButton>
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

        <BattleHUD character={character} />

        <BattleScene
          character={character}
          monster={monster}
          location="판도라 미궁"
        />

        <BattleLog logs={logs} />

        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            variant="primary"
            onClick={startBattle}
            disabled={isRunning}
          >
            전투 시작
          </ActionButton>

          <ActionButton onClick={pauseBattle} disabled={!isRunning}>
            일시정지
          </ActionButton>

          <ActionButton onClick={escapeBattle} variant="danger">
            도주
          </ActionButton>

          <ActionButton onClick={() => router.push("/town")}>
            마을로 돌아가기
          </ActionButton>
        </div>
      </div>
    </main>
  )
}