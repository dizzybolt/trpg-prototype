import { Character, Monster } from "../../lib/types"
import EntityHUD from "./EntityHUD"

type BattleHUDProps = {
  character: Character
  monster: Monster
}

export default function BattleHUD({
  character,
  monster,
}: BattleHUDProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <EntityHUD
        type="player"
        entity={character}
      />

      <EntityHUD
        type="monster"
        entity={monster}
      />
    </div>
  )
}