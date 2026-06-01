"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Character, Monster } from "./types"

type GameStore = {
  character: Character | null
  setCharacter: (character: Character) => void
  clearCharacter: () => void

  monster: Monster | null
  setMonster: (monster: Monster | null) => void

  logs: string[]
  addLog: (log: string) => void
  clearLogs: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      character: null,

      setCharacter: (character) => set({ character }),

      clearCharacter: () =>
        set({
          character: null,
          monster: null,
          logs: [],
        }),

      monster: null,

      setMonster: (monster) => set({ monster }),

      logs: [],

      addLog: (log) =>
        set((state) => ({
          logs: [...state.logs, log],
        })),

      clearLogs: () => set({ logs: [] }),
    }),
    {
      name: "trpg-prototype-save",
    }
  )
)