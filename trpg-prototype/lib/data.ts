import { Job, Monster, Race } from "./types"

export const races: Race[] = [
  {
    id: "human",
    name: "Human",
    str: 0,
    dex: 0,
    int: 0,
    vit: 0,
  },
  {
    id: "elf",
    name: "Elf",
    str: -1,
    dex: 2,
    int: 2,
    vit: -1,
  },
  {
    id: "dwarf",
    name: "Dwarf",
    str: 2,
    dex: -1,
    int: -1,
    vit: 2,
  },
]

export const jobs: Job[] = [
  {
    id: "warrior",
    name: "Warrior",
    hpBonus: 10,
    mpBonus: 0,
  },
  {
    id: "hunter",
    name: "Hunter",
    hpBonus: 5,
    mpBonus: 0,
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    hpBonus: 0,
    mpBonus: 10,
  },
  {
    id: "priest",
    name: "Priest",
    hpBonus: 3,
    mpBonus: 7,
  },
]

export const monsters: Monster[] = [
  {
    id: "goblin",
    name: "Goblin",

    hp: 15,
    maxHp: 15,

    attackMin: 1,
    attackMax: 4,

    exp: 10,
    gold: 5,
  },
  {
    id: "wolf",
    name: "Wolf",

    hp: 20,
    maxHp: 20,

    attackMin: 2,
    attackMax: 5,

    exp: 15,
    gold: 8,
  },
]