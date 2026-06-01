"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useGameStore } from "../../lib/store"

export default function TownPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setCharacter = useGameStore((state) => state.setCharacter)
  const clearCharacter = useGameStore((state) => state.clearCharacter)

  if (!character) {
    return (
      <main className="game-page">
        <div className="game-container">
          <h1 className="game-title">아카데미 타운</h1>

          <div className="game-panel space-y-4">
            <p className="text-slate-400">
              저장된 캐릭터가 없습니다.
            </p>

            <Link href="/character" className="game-button-primary block">
              새 캐릭터 만들기
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const currentCharacter = character

  function restAtInn() {
    setCharacter({
      ...currentCharacter,
      hp: currentCharacter.maxHp,
      mp: currentCharacter.maxMp,
    })
  }

  function newGame() {
    clearCharacter()
    router.push("/character")
  }

  return (
    <main className="game-page">
      <div className="game-container">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">
            Academy Hub
          </p>

          <h1 className="game-title">
            아카데미 타운
          </h1>
        </div>

        <div className="game-panel space-y-4">
          <div>
            <p className="text-sm text-slate-500">탐험가</p>
            <p className="text-2xl font-bold text-amber-100">
              {currentCharacter.name}
            </p>
            <p className="text-slate-400 mt-1">
              {currentCharacter.race.name} / {currentCharacter.job.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">레벨</p>
              <p className="text-xl font-bold">{currentCharacter.level}</p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">소지금</p>
              <p className="text-xl font-bold">{currentCharacter.gold} G</p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">HP</p>
              <p className="text-xl font-bold">
                {currentCharacter.hp}/{currentCharacter.maxHp}
              </p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">MP</p>
              <p className="text-xl font-bold">
                {currentCharacter.mp}/{currentCharacter.maxMp}
              </p>
            </div>
          </div>

          <div className="game-panel-dark">
            <p className="text-xs text-slate-500">경험치</p>
            <p className="text-xl font-bold">{currentCharacter.exp}</p>
          </div>
        </div>

        <div className="game-panel space-y-3">
          <p className="text-sm text-slate-400">
            시설
          </p>

          <button onClick={restAtInn} className="game-button w-full">
            여관에서 휴식
          </button>

          <Link href="/dungeon" className="game-button-primary block">
            판도라 미궁 입장
          </Link>

          <button
            onClick={newGame}
            className="game-button w-full text-red-300"
          >
            새 게임으로 시작
          </button>
        </div>
      </div>
    </main>
  )
}