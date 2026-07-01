import Card from "../ui/Card"
import Portrait from "../ui/Portrait"
import StatusBar from "../ui/StatusBar"
import { Character } from "../../lib/types"

type BattleHUDProps = {
  character: Character
}

export default function BattleHUD({ character }: BattleHUDProps) {
  const nextLevelExp = character.level * 100

  return (
    <Card
      title={character.name}
      subtitle={`${character.race.name} / ${character.job.name}`}
    >
      <div className="flex gap-4">
        <Portrait name={character.name} size="md" />

        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Lv.{character.level}
            </p>

            <p className="text-sm text-slate-400">
              포션 {character.potions ?? 0}개
            </p>
          </div>

          <StatusBar
            label="HP"
            value={character.hp}
            max={character.maxHp}
            variant="hp"
          />

          <StatusBar
            label="MP"
            value={character.mp}
            max={character.maxMp}
            variant="mp"
          />

          <StatusBar
            label="EXP"
            value={character.exp}
            max={nextLevelExp}
            variant="exp"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg bg-slate-950/70 p-2">
          <p className="text-xs text-slate-500">STR</p>
          <p className="font-bold">{character.str}</p>
        </div>

        <div className="rounded-lg bg-slate-950/70 p-2">
          <p className="text-xs text-slate-500">DEX</p>
          <p className="font-bold">{character.dex}</p>
        </div>

        <div className="rounded-lg bg-slate-950/70 p-2">
          <p className="text-xs text-slate-500">INT</p>
          <p className="font-bold">{character.int}</p>
        </div>

        <div className="rounded-lg bg-slate-950/70 p-2">
          <p className="text-xs text-slate-500">VIT</p>
          <p className="font-bold">{character.vit}</p>
        </div>
      </div>
    </Card>
  )
}