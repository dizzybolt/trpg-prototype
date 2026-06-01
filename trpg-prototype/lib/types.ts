export type Race = {
  id: string
  name: string
  str: number
  dex: number
  int: number
  vit: number
}

export type Job = {
  id: string
  name: string
  hpBonus: number
  mpBonus: number
}

export type Character = {
  name: string
  race: Race
  job: Job

  level: number
  exp: number
  gold: number

  str: number
  dex: number
  int: number
  vit: number

  hp: number
  maxHp: number

  mp: number
  maxMp: number
}

export type Monster = {
  id: string
  name: string

  hp: number
  maxHp: number

  attackMin: number
  attackMax: number

  exp: number
  gold: number
}