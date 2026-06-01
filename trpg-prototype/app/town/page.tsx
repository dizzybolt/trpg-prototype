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
            <p className="text-slate-400">저장된 캐릭터가 없습니다.</p>

            <Link href="/character" className="game-button-primary block">
              새 캐릭터 만들기
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const currentCharacter = character

  const hitChance = 75 + Math.floor(currentCharacter.dex / 2)
  const evadeChance = 10 + Math.floor(currentCharacter.dex / 3)
  const criticalChance = 10
  const nextLevelExp = currentCharacter.level * 100

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
          <p className="text-sm text-slate-500">Academy Hub</p>
          <h1 className="game-title">아카데미 타운</h1>
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
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">경험치</p>
              <p className="text-sm text-slate-400">
                다음 레벨까지 {nextLevelExp - currentCharacter.exp}
              </p>
            </div>

            <p className="text-xl font-bold mt-1">
              {currentCharacter.exp}/{nextLevelExp}
            </p>
          </div>
        </div>

        <div className="game-panel space-y-4">
          <h2 className="text-lg font-bold text-amber-200">기본 능력치</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">힘 STR</p>
              <p className="text-2xl font-bold">{currentCharacter.str}</p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">민첩 DEX</p>
              <p className="text-2xl font-bold">{currentCharacter.dex}</p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">지능 INT</p>
              <p className="text-2xl font-bold">{currentCharacter.int}</p>
            </div>

            <div className="game-panel-dark">
              <p className="text-xs text-slate-500">건강 VIT</p>
              <p className="text-2xl font-bold">{currentCharacter.vit}</p>
            </div>
          </div>
        </div>

        <div className="game-panel space-y-4">
          <h2 className="text-lg font-bold text-amber-200">전투 능력</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="game-panel-dark text-center">
              <p className="text-xs text-slate-500">명중률</p>
              <p className="text-xl font-bold">{hitChance}%</p>
            </div>

            <div className="game-panel-dark text-center">
              <p className="text-xs text-slate-500">회피율</p>
              <p className="text-xl font-bold">{evadeChance}%</p>
            </div>

            <div className="game-panel-dark text-center">
              <p className="text-xs text-slate-500">치명타</p>
              <p className="text-xl font-bold">{criticalChance}%</p>
            </div>
          </div>

          <div className="game-panel-dark text-sm text-slate-400 leading-6">
            <p>공격 피해: 1d6 + 힘 보정</p>
            <p>강공격: MP 3 소모 / 높은 피해 / 낮은 명중률</p>
          </div>
        </div>

        <div className="game-panel space-y-3">
          <p className="text-sm text-slate-400">시설</p>

          <button onClick={restAtInn} className="game-button w-full">
            여관에서 휴식
          </button>

          <Link href="/dungeon" className="game-button-primary block">
            판도라 미궁 입장
          </Link>

          <button onClick={newGame} className="game-button w-full text-red-300">
            새 게임으로 시작
          </button>
        </div>
      </div>
    </main>
  )
}