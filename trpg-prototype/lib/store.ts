"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Character, Monster } from "./types"
import { DungeonMap } from "./dungeon/dungeonTypes"

type GameStore = {
  character: Character | null
  setCharacter: (character: Character) => void
  clearCharacter: () => void

  monster: Monster | null
  setMonster: (monster: Monster | null) => void

  dungeonMap: DungeonMap | null
  setDungeonMap: (map: DungeonMap) => void
  clearDungeonMap: () => void

  updateDungeonMap: (
    updater: (map: DungeonMap) => DungeonMap
  ) => void

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
          dungeonMap: null,
          logs: [],
        }),

      monster: null,

      setMonster: (monster) => set({ monster }),

      dungeonMap: null,

      setDungeonMap: (map) =>
        set({
          dungeonMap: map,
        }),

      clearDungeonMap: () =>
        set({
          dungeonMap: null,
        }),      

      updateDungeonMap: (updater) =>
        set((state) => ({
          dungeonMap: state.dungeonMap
            ? updater(state.dungeonMap)
            : null,
        })),

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