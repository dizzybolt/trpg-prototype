import { Direction, DungeonMap, Tile, TileType } from "./dungeonTypes"

const MAP_WIDTH = 15
const MAP_HEIGHT = 15

const directionOrder: Direction[] = ["north", "east", "south", "west"]

const directionDelta: Record<Direction, { dx: number; dy: number }> = {
  north: { dx: 0, dy: -1 },
  east: { dx: 1, dy: 0 },
  south: { dx: 0, dy: 1 },
  west: { dx: -1, dy: 0 },
}

function createTile(x: number, y: number, type: TileType): Tile {
  return {
    x,
    y,
    type,
    discovered: false,
    visible: false,
    visited: false,
    eventDone: false,
  }
}

function cloneMap(map: DungeonMap): DungeonMap {
  return {
    ...map,
    player: { ...map.player },
    tiles: map.tiles.map((row) =>
      row.map((tile) => ({
        ...tile,
      }))
    ),
  }
}

function isInsideMap(map: DungeonMap, x: number, y: number) {
  return x >= 0 && y >= 0 && x < map.width && y < map.height
}

function isWalkable(type: TileType) {
  return type !== "wall" && type !== "door_closed"
}

export function createDungeonMap(floor = 1): DungeonMap {
  const tiles: Tile[][] = []

  for (let y = 0; y < MAP_HEIGHT; y += 1) {
    const row: Tile[] = []

    for (let x = 0; x < MAP_WIDTH; x += 1) {
      const isBorder =
        x === 0 || y === 0 || x === MAP_WIDTH - 1 || y === MAP_HEIGHT - 1

      row.push(createTile(x, y, isBorder ? "wall" : "floor"))
    }

    tiles.push(row)
  }

  // 테스트용 내부 벽
  tiles[4][4].type = "wall"
  tiles[4][5].type = "wall"
  tiles[4][6].type = "wall"
  tiles[8][9].type = "wall"
  tiles[9][9].type = "wall"
  tiles[10][9].type = "wall"

  // 테스트용 특수 타일
  tiles[2][12].type = "stairs_down"
  tiles[7][7].type = "treasure"
  tiles[11][5].type = "trap"

  const map: DungeonMap = {
    id: "pandora_maze",
    name: "판도라 미궁",
    floor,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    tiles,
    player: {
      x: 2,
      y: 12,
      direction: "north",
    },
    visionRange: 1,
  }

  return updateVision(map)
}

export function updateVision(map: DungeonMap): DungeonMap {
  const nextMap = cloneMap(map)
  const { x: px, y: py } = nextMap.player
  const range = nextMap.visionRange

  nextMap.tiles.forEach((row) => {
    row.forEach((tile) => {
      tile.visible = false
    })
  })

  for (let y = py - range; y <= py + range; y += 1) {
    for (let x = px - range; x <= px + range; x += 1) {
      if (!isInsideMap(nextMap, x, y)) continue

      const tile = nextMap.tiles[y][x]

      tile.visible = true
      tile.discovered = true
    }
  }

  const currentTile = nextMap.tiles[py][px]
  currentTile.visited = true
  currentTile.discovered = true
  currentTile.visible = true

  return nextMap
}

export function turnLeft(map: DungeonMap): DungeonMap {
  const nextMap = cloneMap(map)
  const currentIndex = directionOrder.indexOf(nextMap.player.direction)
  const nextIndex = (currentIndex + 3) % directionOrder.length

  nextMap.player.direction = directionOrder[nextIndex]

  return updateVision(nextMap)
}

export function turnRight(map: DungeonMap): DungeonMap {
  const nextMap = cloneMap(map)
  const currentIndex = directionOrder.indexOf(nextMap.player.direction)
  const nextIndex = (currentIndex + 1) % directionOrder.length

  nextMap.player.direction = directionOrder[nextIndex]

  return updateVision(nextMap)
}

export function moveForward(map: DungeonMap): {
  map: DungeonMap
  moved: boolean
  message: string
  tile: Tile
} {
  const nextMap = cloneMap(map)
  const delta = directionDelta[nextMap.player.direction]

  const nextX = nextMap.player.x + delta.dx
  const nextY = nextMap.player.y + delta.dy

  if (!isInsideMap(nextMap, nextX, nextY)) {
    return {
      map: updateVision(nextMap),
      moved: false,
      message: "더 이상 앞으로 나아갈 수 없다.",
      tile: nextMap.tiles[nextMap.player.y][nextMap.player.x],
    }
  }

  const targetTile = nextMap.tiles[nextY][nextX]

  if (!isWalkable(targetTile.type)) {
    return {
      map: updateVision(nextMap),
      moved: false,
      message: "벽이 앞을 가로막고 있다.",
      tile: targetTile,
    }
  }

  nextMap.player.x = nextX
  nextMap.player.y = nextY

  const updatedMap = updateVision(nextMap)
  const arrivedTile = updatedMap.tiles[nextY][nextX]

  return {
    map: updatedMap,
    moved: true,
    message: "앞으로 한 칸 전진했다.",
    tile: arrivedTile,
  }
}

export function getDirectionLabel(direction: Direction) {
  const labels: Record<Direction, string> = {
    north: "북쪽",
    east: "동쪽",
    south: "남쪽",
    west: "서쪽",
  }

  return labels[direction]
}