"use client"

import { useRouter } from "next/navigation"

import { randomRange } from "../../lib/engine"
import { useGameStore } from "../../lib/store"

export default function BattlePage() {
  const router = useRouter()

  const character = useGameStore(
    (state) => state.character
  )

  const setCharacter = useGameStore(
    (state) => state.setCharacter
  )

  const monster = useGameStore(
    (state) => state.monster
  )

  const setMonster = useGameStore(
    (state) => state.setMonster
  )

  const logs = useGameStore(
    (state) => state.logs
  )

  const addLog = useGameStore(
    (state) => state.addLog
  )

  if (!character || !monster) {
    return (
      <main className="game-page">

        <div className="game-container">

          <div className="space-y-2">

            <p className="text-sm text-slate-500">
              Battle Result
            </p>

            <h1 className="game-title">
              전투 종료
            </h1>

          </div>

          <div className="game-panel space-y-4">

            <p className="text-slate-400">
              현재 진행 중인 전투가 없습니다.
            </p>

            <button
              onClick={() =>
                router.push("/dungeon")
              }
              className="game-button"
            >
              계속 탐색
            </button>

            <button
              onClick={() =>
                router.push("/town")
              }
              className="game-button"
            >
              마을로 돌아가기
            </button>

          </div>

        </div>

      </main>
    )
  }

  const currentCharacter = character
  const currentMonster = monster

  const isPlayerDead =
    currentCharacter.hp <= 0

  function monsterTurn() {
    const evadeChance =
      10 +
      Math.floor(
        currentCharacter.dex / 3
      )

    const evadeRoll =
      randomRange(1, 100)

    addLog(
      `${currentMonster.name}의 반격!`
    )

    if (evadeRoll <= evadeChance) {
      addLog(
        `${currentCharacter.name}은(는) 공격을 회피했다!`
      )

      return
    }

    const monsterDamage =
      randomRange(
        currentMonster.attackMin,
        currentMonster.attackMax
      )

    const newPlayerHp =
      currentCharacter.hp -
      monsterDamage

    addLog(
      `${currentCharacter.name}은(는) ${monsterDamage} 피해를 입었다.`
    )

    if (newPlayerHp <= 0) {
      addLog(
        `${currentCharacter.name}은(는) 쓰러졌다.`
      )

      setCharacter({
        ...currentCharacter,
        hp: 0,
      })

      return
    }

    setCharacter({
      ...currentCharacter,
      hp: newPlayerHp,
    })
  }

  function attack() {
    if (isPlayerDead) return

    addLog(
      `${currentCharacter.name}의 공격!`
    )

    const hitChance =
      75 +
      Math.floor(
        currentCharacter.dex / 2
      )

    const hitRoll =
      randomRange(1, 100)

    if (hitRoll > hitChance) {
      addLog(
        "공격이 빗나갔다!"
      )

      monsterTurn()

      return
    }

    const criticalRoll =
      randomRange(1, 100)

    const isCritical =
      criticalRoll <= 10

    let damage =
      randomRange(1, 6) +
      Math.floor(
        currentCharacter.str / 3
      )

    if (isCritical) {
      damage *= 2

      addLog("치명타 발생!")
    }

    const newMonsterHp =
      currentMonster.hp - damage

    addLog(
      `${currentMonster.name}에게 ${damage} 피해를 입혔다.`
    )

    if (newMonsterHp <= 0) {
      addLog(
        `${currentMonster.name}을(를) 쓰러뜨렸다!`
      )

      addLog(
        `${currentMonster.exp} 경험치와 ${currentMonster.gold}G를 획득했다.`
      )

      setCharacter({
        ...currentCharacter,
        exp:
          currentCharacter.exp +
          currentMonster.exp,

        gold:
          currentCharacter.gold +
          currentMonster.gold,
      })

      setMonster(null)

      return
    }

    setMonster({
      ...currentMonster,
      hp: newMonsterHp,
    })

    monsterTurn()
  }

  function runAway() {
    addLog(
      `${currentCharacter.name}은(는) 전투에서 도망쳤다.`
    )

    setMonster(null)

    router.push("/dungeon")
  }

  return (
    <main className="game-page">

      <div className="game-container">

        <div className="space-y-2">

          <p className="text-sm text-slate-500">
            Battle Encounter
          </p>

          <h1 className="game-title">
            전투
          </h1>

        </div>

        <div className="game-panel flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-500">
              적
            </p>

            <p className="text-2xl font-bold text-red-200">
              {currentMonster.name}
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs text-slate-500">
              HP
            </p>

            <p className="text-xl font-bold">
              {currentMonster.hp}
              /
              {currentMonster.maxHp}
            </p>

          </div>

        </div>

        <div className="game-panel-dark h-72 flex flex-col items-center justify-center relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-black/70" />

          <div className="relative z-10 text-center space-y-4">

            <p className="text-7xl text-red-200">
              ☠
            </p>

            <div>

              <p className="text-2xl font-bold">
                {currentMonster.name}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                어둠 속에서 적의 기척이 느껴진다.
              </p>

            </div>

          </div>

        </div>

        <div className="game-panel">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs text-slate-500">
                탐험가
              </p>

              <p className="font-bold text-lg">
                {currentCharacter.name}
              </p>

            </div>

            <div className="text-right">

              <p className="text-xs text-slate-500">
                HP / MP
              </p>

              <p className="font-bold">
                {currentCharacter.hp}
                /
                {currentCharacter.maxHp}
              </p>

              <p className="text-sm text-slate-400">
                MP
                {" "}
                {currentCharacter.mp}
                /
                {currentCharacter.maxMp}
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={attack}
            disabled={isPlayerDead}
            className="game-button-primary disabled:opacity-40"
          >
            공격
          </button>

          <button
            onClick={runAway}
            disabled={isPlayerDead}
            className="game-button disabled:opacity-40"
          >
            도주
          </button>

        </div>

        {isPlayerDead && (
          <button
            onClick={() =>
              router.push("/town")
            }
            className="game-button text-red-300"
          >
            쓰러진 상태로 마을로 돌아가기
          </button>
        )}

        <div className="game-log">

          {logs.map((log, index) => (
            <p key={index}>
              {log}
            </p>
          ))}

        </div>

      </div>

    </main>
  )
}