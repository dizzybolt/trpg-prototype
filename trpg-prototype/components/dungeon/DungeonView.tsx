import { DungeonMap } from "../../lib/dungeon/dungeonTypes"
import MiniMap from "./MiniMap"

type DungeonViewProps = {
  map: DungeonMap
}

export default function DungeonView({
  map,
}: DungeonViewProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-slate-800
        bg-slate-950
        p-4
        shadow-lg
      "
    >
      {/* 상단 */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Dungeon
          </p>

          <h2 className="text-xl font-bold text-amber-200">
            {map.name}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">
            Floor
          </p>

          <p className="text-lg font-bold text-white">
            {map.floor}
          </p>
        </div>
      </div>

      {/* 던전 화면 */}
      <div
        className="
          rounded-lg
          border
          border-slate-800
          bg-black
          p-4
        "
      >
        <div className="flex justify-center">
          <MiniMap map={map} />
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-slate-900 p-3">
          <div className="text-slate-500">
            현재 위치
          </div>

          <div className="mt-1 font-semibold">
            X {map.player.x} / Y {map.player.y}
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-3">
          <div className="text-slate-500">
            층
          </div>

          <div className="mt-1 font-semibold">
            {map.floor} F
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-3">
          <div className="text-slate-500">
            탐사율
          </div>

          <div className="mt-1 font-semibold">
            준비중
          </div>
        </div>
      </div>
    </div>
  )
}