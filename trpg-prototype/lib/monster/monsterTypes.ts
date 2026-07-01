export type MonsterRarity = "normal" | "elite" | "rare" | "boss"

export type MonsterRegion =
  | "pandora_maze"
  | "forest_of_soul"
  | "cor_desert"

export type MonsterTemplate = {
  id: string
  name: string
  level: number
  rarity: MonsterRarity
  regions: MonsterRegion[]

  maxHp: number
  attackMin: number
  attackMax: number

  exp: number
  gold: number

  portrait?: string
}