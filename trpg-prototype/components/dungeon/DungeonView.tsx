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

      <div className="grid gap-3 lg:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-800 bg-black p-4 text-center">
            <div className="text-5xl text-amber-300">
              {getDirectionSymbol(map.player.direction)}
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {getDirectionLabel(map.player.direction)}을(를) 바라보고 있다
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm lg:grid-cols-1">
            <div className="rounded-lg bg-slate-900 p-3">
              <div className="text-slate-500">현재 위치</div>
              <div className="mt-1 font-semibold">
                X {map.player.x} / Y {map.player.y}
              </div>
            </div>

            <div className="rounded-lg bg-slate-900 p-3">
              <div className="text-slate-500">탐사율</div>
              <div className="mt-1 font-semibold">{explorationRate}%</div>
            </div>

            <div className="rounded-lg bg-slate-900 p-3">
              <div className="text-slate-500">현재 상태</div>
              <div className="mt-1 font-semibold">조용하다...</div>
            </div>
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center rounded-lg border border-slate-800 bg-black p-4">
          <MiniMap map={map} tileSize={16} />

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
    </div>
  )
}