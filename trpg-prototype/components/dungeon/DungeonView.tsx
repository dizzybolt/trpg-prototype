import MiniMap from "./MiniMap"
import { DungeonMap } from "../../lib/dungeon/dungeonTypes"
import {
  getDirectionLabel,
  getExplorationRate,
} from "../../lib/dungeon/dungeonMapEngine"

type DungeonViewProps = {
  map: DungeonMap
  onTurnLeft: () => void
  onMoveForward: () => void
  onTurnRight: () => void
  onInspect: () => void
  onInteract: () => void
}

function getDirectionSymbol(direction: DungeonMap["player"]["direction"]) {
  switch (direction) {
    case "north":
      return "▲"
    case "east":
      return "▶"
    case "south":
      return "▼"
    case "west":
      return "◀"
    default:
      return "▲"
  }
}

function getShortDirectionLabel(direction: DungeonMap["player"]["direction"]) {
  switch (direction) {
    case "north":
      return "북"
    case "east":
      return "동"
    case "south":
      return "남"
    case "west":
      return "서"
    default:
      return "북"
  }
}

export default function DungeonView({
  map,
  onTurnLeft,
  onMoveForward,
  onTurnRight,
  onInspect,
  onInteract,
}: DungeonViewProps) {
  const explorationRate = getExplorationRate(map)

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 shadow-lg">
      <div className="mb-3 flex items-end justify-between border-b border-slate-800 pb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">
            PANDORA MAZE
          </p>
          <h2 className="mt-1 text-xl font-bold text-amber-200">{map.name}</h2>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Floor</p>
          <p className="text-xl font-bold text-white">{map.floor}</p>
        </div>
      </div>

      <div className="relative flex min-h-[430px] items-center justify-center rounded-lg border border-slate-800 bg-black p-4">
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full border border-cyan-500/40 bg-slate-950/90 px-4 py-2 text-center shadow-lg shadow-black/40">
          <div className="text-2xl text-cyan-300">
            {getDirectionSymbol(map.player.direction)}
          </div>
          <div className="text-xs font-bold text-cyan-100">
            {getShortDirectionLabel(map.player.direction)}
          </div>
          <div className="mt-1 text-[10px] text-slate-500">
            X {map.player.x} / Y {map.player.y}
          </div>
        </div>

        <MiniMap map={map} tileSize={19} />

        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-700 bg-slate-950/90 px-4 py-1 text-sm font-bold text-slate-200">
          {explorationRate}%
        </div>

        <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-2">
          <button
            onClick={onTurnLeft}
            className="h-12 w-12 rounded-lg bg-slate-900/95 text-lg font-bold"
          >
            ↺
          </button>

          <button
            onClick={onMoveForward}
            className="h-12 w-12 rounded-lg border border-amber-500 bg-amber-700/90 text-lg font-bold text-white"
          >
            ↑
          </button>

          <button
            onClick={onTurnRight}
            className="h-12 w-12 rounded-lg bg-slate-900/95 text-lg font-bold"
          >
            ↻
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={onInspect}
            title="조사"
            className="h-12 w-12 rounded-full bg-slate-900/95 text-xl"
          >
            🔍
          </button>

          <button
            onClick={onInteract}
            title="상호작용"
            className="h-12 w-12 rounded-full bg-slate-900/95 text-xl"
          >
            ✋
          </button>
        </div>
      </div>
    </div>
  )
}