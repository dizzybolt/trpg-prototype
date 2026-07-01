import { randomRange } from "./engine"
import { Character, Monster } from "./types"

export type BattleOutcome = "ongoing" | "victory" | "defeat"

export type BattleTurnResult = {
  character: Character
  monster: Monster | null
  logs: string[]
  outcome: BattleOutcome
}

function handleVictory(
  character: Character,
  monster: Monster
): BattleTurnResult {
  const logs: string[] = []

  const gainedExp = monster.exp
  const gainedGold = monster.gold

  let newLevel = character.level
  let newExp = character.exp + gainedExp
  let newMaxHp = character.maxHp
  let newMaxMp = character.maxMp
  let newStr = character.str
  let newDex = character.dex
  let newInt = character.int
  let newVit = character.vit
  let newHp = character.hp
  let newMp = character.mp

  const requiredExp = character.level * 100

  logs.push(`${monster.name}을(를) 쓰러뜨렸다!`)
  logs.push(`${gainedExp} 경험치와 ${gainedGold}G를 획득했다.`)

  if (newExp >= requiredExp) {
    newLevel += 1
    newExp -= requiredExp

    const hpGrowth = randomRange(4, 8)
    const mpGrowth = randomRange(2, 5)

    newMaxHp += hpGrowth
    newMaxMp += mpGrowth
    newStr += 1
    newDex += 1
    newInt += 1
    newVit += 1

    newHp = newMaxHp
    newMp = newMaxMp

    logs.push("")
    logs.push(`LEVEL UP! → Lv.${newLevel}`)
    logs.push(`HP +${hpGrowth} / MP +${mpGrowth}`)
    logs.push("모든 능력치가 상승했다.")
  }

  return {
    character: {
      ...character,
      level: newLevel,
      exp: newExp,
      gold: character.gold + gainedGold,
      str: newStr,
      dex: newDex,
      int: newInt,
      vit: newVit,
      maxHp: newMaxHp,
      maxMp: newMaxMp,
      hp: newHp,
      mp: newMp,
    },
    monster: null,
    logs,
    outcome: "victory",
  }
}

function monsterAction(
  character: Character,
  monster: Monster
): BattleTurnResult {
  const logs: string[] = []

  logs.push(`${monster.name}의 반격!`)

  const evadeChance = 10 + Math.floor(character.dex / 3)
  const evadeRoll = randomRange(1, 100)

  if (evadeRoll <= evadeChance) {
    logs.push(`${character.name}은(는) 공격을 회피했다!`)

    return {
      character,
      monster,
      logs,
      outcome: "ongoing",
    }
  }

  const damage = randomRange(monster.attackMin, monster.attackMax)
  const newHp = character.hp - damage

  logs.push(`${character.name}은(는) ${damage} 피해를 입었다.`)

  if (newHp <= 0) {
    logs.push(`${character.name}은(는) 쓰러졌다.`)

    return {
      character: {
        ...character,
        hp: 0,
      },
      monster,
      logs,
      outcome: "defeat",
    }
  }

  return {
    character: {
      ...character,
      hp: newHp,
    },
    monster,
    logs,
    outcome: "ongoing",
  }
}

function playerNormalAttack(
  character: Character,
  monster: Monster
): BattleTurnResult {
  const logs: string[] = []

  logs.push(`${character.name}의 공격!`)

  const hitChance = 75 + Math.floor(character.dex / 2)
  const hitRoll = randomRange(1, 100)

  if (hitRoll > hitChance) {
    logs.push("공격이 빗나갔다!")

    const monsterResult = monsterAction(character, monster)

    return {
      ...monsterResult,
      logs: [...logs, ...monsterResult.logs],
    }
  }

  let damage = randomRange(1, 6) + Math.floor(character.str / 3)

  if (randomRange(1, 100) <= 10) {
    damage *= 2
    logs.push("치명타 발생!")
  }

  const newMonsterHp = monster.hp - damage

  logs.push(`${monster.name}에게 ${damage} 피해를 입혔다.`)

  if (newMonsterHp <= 0) {
    const victoryResult = handleVictory(character, monster)

    return {
      ...victoryResult,
      logs: [...logs, ...victoryResult.logs],
    }
  }

  const updatedMonster = {
    ...monster,
    hp: newMonsterHp,
  }

  const monsterResult = monsterAction(character, updatedMonster)

  return {
    ...monsterResult,
    logs: [...logs, ...monsterResult.logs],
  }
}

function playerHeavyAttack(
  character: Character,
  monster: Monster
): BattleTurnResult {
  const logs: string[] = []

  const characterAfterMpCost = {
    ...character,
    mp: character.mp - 3,
  }

  logs.push(`${character.name}의 강공격!`)
  logs.push("MP를 3 소모했다.")

  const hitChance = 65 + Math.floor(character.dex / 2)
  const hitRoll = randomRange(1, 100)

  if (hitRoll > hitChance) {
    logs.push("강공격이 빗나갔다!")

    const monsterResult = monsterAction(characterAfterMpCost, monster)

    return {
      ...monsterResult,
      logs: [...logs, ...monsterResult.logs],
    }
  }

  const damage = randomRange(8, 14) + Math.floor(character.str / 2)
  const newMonsterHp = monster.hp - damage

  logs.push(`${monster.name}에게 ${damage}의 강력한 피해를 입혔다!`)

  if (newMonsterHp <= 0) {
    const victoryResult = handleVictory(characterAfterMpCost, monster)

    return {
      ...victoryResult,
      logs: [...logs, ...victoryResult.logs],
    }
  }

  const updatedMonster = {
    ...monster,
    hp: newMonsterHp,
  }

  const monsterResult = monsterAction(characterAfterMpCost, updatedMonster)

  return {
    ...monsterResult,
    logs: [...logs, ...monsterResult.logs],
  }
}

function useAutoPotion(
  character: Character,
  monster: Monster
): BattleTurnResult {
  const logs: string[] = []

  const healAmount = randomRange(10, 18)
  const newHp = Math.min(character.maxHp, character.hp + healAmount)

  const healedCharacter = {
    ...character,
    hp: newHp,
    potions: character.potions - 1,
  }

  logs.push(`${character.name}은(는) 회복 포션을 사용했다.`)
  logs.push(`HP가 ${newHp - character.hp} 회복되었다.`)

  const monsterResult = monsterAction(healedCharacter, monster)

  return {
    ...monsterResult,
    logs: [...logs, ...monsterResult.logs],
  }
}

export function processAutoBattleTurn(
  character: Character,
  monster: Monster
): BattleTurnResult {
  if (
    character.hp <= Math.floor(character.maxHp * 0.35) &&
    character.potions > 0
  ) {
    return useAutoPotion(character, monster)
  }

  const useSkill = character.mp >= 3 && randomRange(1, 100) <= 30

  if (useSkill) {
    return playerHeavyAttack(character, monster)
  }

  return playerNormalAttack(character, monster)
}