"use client"

import { create } from "zustand"
import { Character, Monster } from "./types"

type GameStore = {
  character: Character | null
  setCharacter: (character: Character) => void

  monster: Monster | null
  setMonster: (monster: Monster | null) => void

  logs: string[]
  addLog: (log: string) => void
  clearLogs: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  character: null,

  setCharacter: (character) =>
    set({
      character,
    }),

  monster: null,

  setMonster: (monster) =>
    set({
      monster,
    }),

  logs: [],

  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log],
    })),

  clearLogs: () =>
    set({
      logs: [],
    }),
}))