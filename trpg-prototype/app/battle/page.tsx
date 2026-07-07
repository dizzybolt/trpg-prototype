"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import ActionBar from "../../components/ui/ActionBar"
import GameLog from "../../components/ui/GameLog"
import PartyHUD from "../../components/ui/PartyHUD"
import BattleScene from "../../components/battle/BattleScene"

import { processAutoBattleTurn } from "../../lib/battleEngine"
import { useGameStore } from "../../lib/store"

type BattleResult = "victory" | "defeat" | "escaped" | null

type LogEntry = {
  text: string
  type?: "normal" | "battle" | "story" | "heal"
}

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

  const gameLogs: LogEntry[] = logs.map((log) => ({
    text: log,
    type:
      log.includes("회복") || log.includes("포션")
        ? "heal"
        : log.includes("피해") ||
          log.includes("공격") ||
          log.includes("치명타") ||
          log.includes("쓰러졌다")
        ? "battle"
        : log.includes("획득") || log.includes("LEVEL")
        ? "story"
        : "normal",
  }))

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

  if (!character || !monster) {
    return (
      <main className="game-page">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-amber-200">전투</h1>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-slate-400">현재 진행 중인 전투가 없습니다.</p>

            <div className="mt-4 max-w-md">
              <ActionBar
                actions={[
                  {
                    label: "탐험",
                    hotkey: "W",
                    icon: "↑",
                    variant: "primary",
                    onClick: () => router.push("/dungeon"),
                  },
                  {
                    label: "마을",
                    hotkey: "ESC",
                    icon: "☰",
                    onClick: () => router.push("/town"),
                  },
                ]}
              />
            </div>
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
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-3 p-3 lg:p-4">
        <header className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500 lg:text-sm">Battle Encounter</p>
            <h1 className="text-2xl font-bold text-amber-200 lg:text-3xl">
              {battleResult ? "전투 결과" : "전투"}
            </h1>
          </div>

          <div className="text-right text-sm text-slate-400">
            <p>{isRunning ? "AUTO BATTLE" : "READY"}</p>
            {battleResult && (
              <p className="font-bold text-amber-200">
                {battleResult === "victory" && "승리"}
                {battleResult === "defeat" && "패배"}
                {battleResult === "escaped" && "이탈"}
              </p>
            )}
          </div>
        </header>

        <section className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
          <div className="flex min-h-0 flex-col gap-3">
            {!battleResult && (
              <BattleScene
                character={character}
                monster={monster}
                location="판도라 미궁"
                isRunning={isRunning}
              />
            )}

            {battleResult && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-xl font-bold text-amber-100">
                  {battleResult === "victory" && "승리!"}
                  {battleResult === "defeat" && "패배..."}
                  {battleResult === "escaped" && "전투에서 이탈했다."}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  전투가 종료되었다. 다음 행동을 선택하자.
                </p>
              </div>
            )}

            <GameLog title="전투 로그" logs={gameLogs} />
          </div>

          <PartyHUD members={[character]} />
        </section>

        <div className="shrink-0">
          {battleResult ? (
            <ActionBar
              actions={[
                {
                  label: "계속 탐험",
                  hotkey: "W",
                  icon: "↑",
                  variant: "primary",
                  onClick: () => router.push("/dungeon"),
                },
                {
                  label: "마을",
                  hotkey: "ESC",
                  icon: "☰",
                  onClick: () => router.push("/town"),
                },
              ]}
            />
          ) : (
            <ActionBar
              actions={[
                {
                  label: "자동전투",
                  hotkey: "A",
                  icon: "▶",
                  variant: "primary",
                  onClick: startBattle,
                },
                {
                  label: "일시정지",
                  hotkey: "Space",
                  icon: "Ⅱ",
                  onClick: pauseBattle,
                },
                {
                  label: "도주",
                  hotkey: "ESC",
                  icon: "↷",
                  variant: "danger",
                  onClick: escapeBattle,
                },
                {
                  label: "마을",
                  hotkey: "M",
                  icon: "☰",
                  onClick: () => router.push("/town"),
                },
              ]}
            />
          )}
        </div>
      </div>
    </main>
  )
}