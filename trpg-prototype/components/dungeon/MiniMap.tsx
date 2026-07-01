import Panel from "../ui/Panel"
import { DungeonMap } from "../../lib/dungeon/dungeonTypes"

type MiniMapProps = {
  map: DungeonMap
}

export default function MiniMap({ map }: MiniMapProps) {
  function getTileSymbol(x: number, y: number) {
    const tile = map.tiles[y][x]

    // 현재 플레이어
    if (map.player.x === x && map.player.y === y) {
      return {
        symbol: "▲",
        className: "text-amber-300",
      }
    }

    // 아직 발견하지 못한 지역
    if (!tile.discovered) {
      return {
        symbol: " ",
        className: "bg-black",
      }
    }

    // 현재 시야 밖
    if (!tile.visible) {
      return {
        symbol: "",
        className: "bg-slate-900",
      }
    }

    switch (tile.type) {
      case "wall":
        return {
          symbol: "■",
          className: "text-slate-600",
        }

      case "floor":
        return {
          symbol: "·",
          className: "text-slate-500",
        }

      case "stairs_down":
        return {
          symbol: "▽",
          className: "text-emerald-300",
        }

      case "stairs_up":
        return {
          symbol: "△",
          className: "text-cyan-300",
        }

      case "treasure":
        return {
          symbol: "★",
          className: "text-yellow-300",
        }

      case "trap":
        return {
          symbol: "×",
          className: "text-red-400",
        }

      case "door_closed":
        return {
          symbol: "▣",
          className: "text-orange-300",
        }

      case "door_open":
        return {
          symbol: "□",
          className: "text-orange-200",
        }

      default:
        return {
          symbol: "?",
          className: "text-slate-500",
        }
    }
  }

  return (
    <Panel
      title={`${map.name} ${map.floor}층`}
    >
      <div
        className="
          inline-grid
          gap-[2px]
          rounded-lg
          bg-slate-950
          p-2
        "
        style={{
          gridTemplateColumns: `repeat(${map.width}, 20px)`,
        }}
      >
        {map.tiles.flat().map((tile) => {
          const display = getTileSymbol(tile.x, tile.y)

          return (
            <div
              key={`${tile.x}-${tile.y}`}
              className={`
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                text-xs
                font-bold
                ${display.className}
              `}
            >
              {display.symbol}
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-y-1 text-xs text-slate-400">
        <span>▲ 플레이어</span>
        <span>■ 벽</span>

        <span>· 길</span>
        <span>▽ 아래 계단</span>

        <span>△ 위 계단</span>
        <span>★ 보물</span>

        <span>× 함정</span>
        <span>▣ 문</span>
      </div>
    </Panel>
  )
}