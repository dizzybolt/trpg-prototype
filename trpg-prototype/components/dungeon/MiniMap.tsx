import { DungeonMap } from "../../lib/dungeon/dungeonTypes"

type MiniMapProps = {
  map: DungeonMap
  tileSize?: number
}

export default function MiniMap({
  map,
  tileSize = 14,
}: MiniMapProps) {
  function getPlayerSymbol() {
    switch (map.player.direction) {
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

  function getTileSymbol(x: number, y: number) {
    const tile = map.tiles[y][x]

    if (map.player.x === x && map.player.y === y) {
      return {
        symbol: getPlayerSymbol(),
        className: "text-amber-300 bg-slate-900",
      }
    }

    if (!tile.discovered) {
      return {
        symbol: "",
        className: "bg-black",
      }
    }

    if (!tile.visible) {
      return {
        symbol: "",
        className: "bg-slate-900",
      }
    }

    switch (tile.type) {
      case "wall":
        return { symbol: "■", className: "text-slate-600 bg-slate-950" }
      case "floor":
        return { symbol: "·", className: "text-slate-500 bg-slate-900" }
      case "stairs_down":
        return { symbol: "▽", className: "text-emerald-300 bg-slate-900" }
      case "stairs_up":
        return { symbol: "△", className: "text-cyan-300 bg-slate-900" }
      case "treasure":
        return { symbol: "★", className: "text-yellow-300 bg-slate-900" }
      case "trap":
        return { symbol: "×", className: "text-red-400 bg-slate-900" }
      case "door_closed":
        return { symbol: "▣", className: "text-orange-300 bg-slate-900" }
      case "door_open":
        return { symbol: "□", className: "text-orange-200 bg-slate-900" }
      default:
        return { symbol: "?", className: "text-slate-500 bg-slate-900" }
    }
  }

  return (
    <div>
      <div
        className="inline-grid gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${map.width}, ${tileSize}px)`,
        }}
      >
        {map.tiles.flat().map((tile) => {
          const display = getTileSymbol(tile.x, tile.y)

          return (
            <div
              key={`${tile.x}-${tile.y}`}
              className={`flex items-center justify-center rounded text-[10px] font-bold ${display.className}`}
              style={{
                width: tileSize,
                height: tileSize,
              }}
            >
              {display.symbol}
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-400 lg:absolute lg:right-3 lg:top-3 lg:mt-0 lg:grid-cols-1">
        <span>▲ 플레이어</span>
        <span>· 길</span>
        <span>■ 벽</span>
        <span>▽ 계단</span>
        <span>★ 보물</span>
        <span>× 함정</span>
      </div>
    </div>
  )
}