import Card from "../ui/Card"
import Portrait from "../ui/Portrait"
import StatusBar from "../ui/StatusBar"
import { Character, Monster } from "../../lib/types"

type EntityHUDProps = {
  type: "player" | "monster"
  entity: Character | Monster
}

function isCharacter(entity: Character | Monster): entity is Character {
  return "mp" in entity && "maxMp" in entity
}

export default function EntityHUD({ type, entity }: EntityHUDProps) {
  const isPlayer = type === "player"
  const titleColor = isPlayer ? "text-amber-100" : "text-red-200"

  return (
    <Card className="h-full">
      <div className="flex gap-4">
        <Portrait
          name={entity.name}
          size="md"
        />

        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs text-slate-500">
              {isPlayer ? "PLAYER" : "ENEMY"}
            </p>

            <p className={`text-xl font-bold ${titleColor}`}>
              {entity.name}
            </p>

            {isCharacter(entity) && (
              <p className="text-sm text-slate-400">
                Lv.{entity.level} / {entity.race.name} / {entity.job.name}
              </p>
            )}
          </div>

          <StatusBar
            label="HP"
            value={entity.hp}
            max={entity.maxHp}
            variant="hp"
          />

          {isCharacter(entity) && (
            <StatusBar
              label="MP"
              value={entity.mp}
              max={entity.maxMp}
              variant="mp"
            />
          )}

          {isCharacter(entity) && (
            <div className="flex justify-between text-xs text-slate-400">
              <span>포션 {entity.potions ?? 0}개</span>
              <span>EXP {entity.exp}/{entity.level * 100}</span>
            </div>
          )}
        </div>
      </div>

      {isCharacter(entity) && (
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          <div className="rounded-lg bg-slate-950/70 p-2">
            <p className="text-xs text-slate-500">STR</p>
            <p className="font-bold">{entity.str}</p>
          </div>

          <div className="rounded-lg bg-slate-950/70 p-2">
            <p className="text-xs text-slate-500">DEX</p>
            <p className="font-bold">{entity.dex}</p>
          </div>

          <div className="rounded-lg bg-slate-950/70 p-2">
            <p className="text-xs text-slate-500">INT</p>
            <p className="font-bold">{entity.int}</p>
          </div>

          <div className="rounded-lg bg-slate-950/70 p-2">
            <p className="text-xs text-slate-500">VIT</p>
            <p className="font-bold">{entity.vit}</p>
          </div>
        </div>
      )}
    </Card>
  )
}