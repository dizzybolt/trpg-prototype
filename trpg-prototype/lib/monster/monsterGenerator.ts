import { Monster } from "../types"
import { monsterDatabase } from "./monsterDatabase"
import { MonsterRegion, MonsterTemplate } from "./monsterTypes"

function templateToMonster(template: MonsterTemplate): Monster {
  return {
    id: template.id,
    name: template.name,
    hp: template.maxHp,
    maxHp: template.maxHp,
    attackMin: template.attackMin,
    attackMax: template.attackMax,
    exp: template.exp,
    gold: template.gold,
  }
}

export function generateMonster(region: MonsterRegion): Monster {
  const candidates = monsterDatabase.filter((monster) =>
    monster.regions.includes(region)
  )

  const selected =
    candidates[Math.floor(Math.random() * candidates.length)] ??
    monsterDatabase[0]

  return templateToMonster(selected)
}