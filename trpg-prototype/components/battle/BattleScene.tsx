import Portrait from "../ui/Portrait"
import Panel from "../ui/Panel"
import { Character, Monster } from "../../lib/types"

type BattleSceneProps = {
  character: Character
  monster: Monster
  location?: string
}

export default function BattleScene({
  character,
  monster,
  location = "판도라의 숲",
}: BattleSceneProps) {
  return (
    <Panel title={location}>
      <div className="flex items-center justify-between gap-8 py-6">
        {/* 플레이어 */}
        <div className="flex flex-col items-center flex-1">
          <Portrait
            name={character.name}
            size="lg"
          />

          <p className="mt-4 text-lg font-bold text-amber-200">
            {character.name}
          </p>

          <p className="text-sm text-slate-400">
            Lv.{character.level}
          </p>
        </div>

        {/* 중앙 */}
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3">
            <span className="text-sm tracking-[0.3em] text-slate-400">
              BATTLE
            </span>
          </div>
        </div>

        {/* 몬스터 */}
        <div className="flex flex-col items-center flex-1">
          <Portrait
            name={monster.name}
            size="lg"
          />

          <p className="mt-4 text-lg font-bold text-red-300">
            {monster.name}
          </p>

          <p className="text-sm text-slate-400">
            HP {monster.hp}/{monster.maxHp}
          </p>
        </div>
      </div>
    </Panel>
  )
}