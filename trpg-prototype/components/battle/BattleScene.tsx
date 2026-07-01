import Portrait from "../ui/Portrait"
import Panel from "../ui/Panel"
import { Character, Monster } from "../../lib/types"

type BattleSceneProps = {
  character: Character
  monster: Monster
  location?: string
  isRunning?: boolean
}

export default function BattleScene({
  character,
  monster,
  location = "판도라 미궁",
  isRunning = false,
}: BattleSceneProps) {
  return (
    <Panel
      title={location}
      rightContent={
        <span className="text-xs font-bold text-slate-500">
          {isRunning ? "AUTO BATTLE" : "READY"}
        </span>
      }
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 via-slate-950/70 to-black/90" />

      <div className="relative z-10 min-h-72 flex items-center justify-between gap-4 py-6">
        <div className="flex flex-1 flex-col items-center">
          <Portrait name={character.name} size="lg" />

          <p className="mt-3 text-lg font-bold text-amber-200">
            {character.name}
          </p>

          <div className="mt-2 flex gap-1 text-xs text-slate-500">
            <span className="rounded-full border border-slate-700 px-2 py-1">
              버프 없음
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-2">
          <div className="rounded-full border border-amber-500/40 bg-black/50 px-5 py-3 shadow-lg shadow-black/40">
            <span className="text-xs tracking-[0.35em] text-amber-200">
              VS
            </span>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            {isRunning ? "전투 진행 중" : "전투 대기"}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <Portrait name={monster.name} size="lg" />

          <p className="mt-3 text-lg font-bold text-red-300">
            {monster.name}
          </p>

          <div className="mt-2 flex gap-1 text-xs text-slate-500">
            <span className="rounded-full border border-slate-700 px-2 py-1">
              상태 이상 없음
            </span>
          </div>
        </div>
      </div>
    </Panel>
  )
}