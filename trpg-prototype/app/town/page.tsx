"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import ActionBar from "../../components/ui/ActionBar"
import PartyHUD from "../../components/ui/PartyHUD"
import { useGameStore } from "../../lib/store"

export default function TownPage() {
  const router = useRouter()

  const character = useGameStore((state) => state.character)
  const setCharacter = useGameStore((state) => state.setCharacter)
  const clearCharacter = useGameStore((state) => state.clearCharacter)

  if (!character) {
    return (
      <main className="game-page">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-4 p-4">
          <h1 className="text-3xl font-bold text-amber-200">마을</h1>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-slate-400">저장된 캐릭터가 없습니다.</p>

            <Link href="/character" className="game-button-primary mt-4 block">
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
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-3 p-3 lg:p-4">
        <header className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500 lg:text-sm">Town</p>
            <h1 className="text-2xl font-bold text-amber-200 lg:text-3xl">
              마을
            </h1>
          </div>

          <div className="text-right text-sm text-slate-400">
            <p>골드 {currentCharacter.gold} G</p>
            <p>Lv.{currentCharacter.level}</p>
            <PartyHUD members={[currentCharacter]} />
          </div>
        </header>

        <section className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="h-64 overflow-hidden rounded-lg border border-slate-800 bg-black lg:h-80">
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-center">
                  <p className="text-5xl">🏘️</p>
                  <p className="mt-4 text-xl font-bold text-amber-200">
                    아카데미 타운
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    모험가들이 모여 정보를 교환하는 작은 마을.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-800 bg-black/40 p-3">
                <p className="text-xs text-slate-500">LOCATION</p>
                <p className="mt-1 font-bold text-amber-200">아카데미 타운</p>
                <p className="mt-1 text-sm text-slate-400">
                  여관, 상점, 길드, 대장간이 모여 있는 탐험의 거점이다.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="mb-3 text-sm font-bold tracking-widest text-amber-200">
                MENU
              </p>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                <button onClick={restAtInn} className="game-button">
                  <div className="text-2xl">🛏️</div>
                  <div className="mt-2 font-bold">여관</div>
                  <div className="text-xs text-slate-500">HP/MP 회복</div>
                </button>

                <button
                  onClick={() => alert("상점은 준비 중입니다.")}
                  className="game-button"
                >
                  <div className="text-2xl">💰</div>
                  <div className="mt-2 font-bold">상점</div>
                  <div className="text-xs text-slate-500">아이템 구매</div>
                </button>

                <button
                  onClick={() => alert("대장간은 준비 중입니다.")}
                  className="game-button"
                >
                  <div className="text-2xl">⚒️</div>
                  <div className="mt-2 font-bold">대장간</div>
                  <div className="text-xs text-slate-500">장비 강화</div>
                </button>

                <button
                  onClick={() => alert("게시판은 준비 중입니다.")}
                  className="game-button"
                >
                  <div className="text-2xl">📜</div>
                  <div className="mt-2 font-bold">게시판</div>
                  <div className="text-xs text-slate-500">퀘스트 확인</div>
                </button>

                <button
                  onClick={() => alert("창고는 준비 중입니다.")}
                  className="game-button"
                >
                  <div className="text-2xl">📦</div>
                  <div className="mt-2 font-bold">창고</div>
                  <div className="text-xs text-slate-500">아이템 보관</div>
                </button>

                <button onClick={() => router.push("/dungeon")} className="game-button-primary">
                  <div className="text-2xl">⛩️</div>
                  <div className="mt-2 font-bold">미궁 입장</div>
                  <div className="text-xs text-slate-900">판도라 미궁</div>
                </button>
              </div>
            </div>
          </div>

          <PartyHUD members={[character]} />
        </section>

        <ActionBar
          actions={[
            {
              label: "여관",
              hotkey: "I",
              icon: "🛏️",
              onClick: restAtInn,
            },
            {
              label: "미궁",
              hotkey: "W",
              icon: "↑",
              variant: "primary",
              onClick: () => router.push("/dungeon"),
            },
            {
              label: "새 게임",
              hotkey: "N",
              icon: "↺",
              variant: "danger",
              onClick: newGame,
            },
            {
              label: "메뉴",
              hotkey: "ESC",
              icon: "☰",
              onClick: () => alert("메뉴는 준비 중입니다."),
            },
          ]}
        />
      </div>
    </main>
  )
}