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
      <main className="min-h-screen bg-black text-white p-6">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <h1 className="text-3xl font-bold">
            저장된 캐릭터가 없습니다
          </h1>

          <Link
            href="/character"
            className="border p-4 text-center"
          >
            새 캐릭터 만들기
          </Link>
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
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto flex flex-col gap-4">

        <h1 className="text-3xl font-bold">
          아카데미 타운
        </h1>

        <div className="border p-4 space-y-2">

          <p>
            이름:
            {" "}
            {currentCharacter.name}
          </p>

          <p>
            종족 / 직업:
            {" "}
            {currentCharacter.race.name}
            {" / "}
            {currentCharacter.job.name}
          </p>

          <p>
            레벨:
            {" "}
            {currentCharacter.level}
          </p>

          <p>
            HP:
            {" "}
            {currentCharacter.hp}
            /
            {currentCharacter.maxHp}
          </p>

          <p>
            MP:
            {" "}
            {currentCharacter.mp}
            /
            {currentCharacter.maxMp}
          </p>

          <p>
            경험치:
            {" "}
            {currentCharacter.exp}
          </p>

          <p>
            소지금:
            {" "}
            {currentCharacter.gold}
            G
          </p>

        </div>

        <button
          onClick={restAtInn}
          className="border p-4"
        >
          여관에서 휴식
        </button>

        <Link
          href="/dungeon"
          className="border p-4 text-center"
        >
          판도라 미궁 입장
        </Link>

        <button
          onClick={newGame}
          className="border p-4 text-red-300"
        >
          새 게임으로 시작
        </button>

      </div>
    </main>
  )
}