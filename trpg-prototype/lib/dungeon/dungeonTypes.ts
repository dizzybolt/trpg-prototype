export type Direction = "north" | "east" | "south" | "west"

export type TileType =
  | "wall"
  | "floor"
  | "stairs_down"
  | "stairs_up"
  | "treasure"
  | "trap"
  | "door_closed"
  | "door_open"

export type Tile = {
  x: number
  y: number
  type: TileType
  discovered: boolean
  visible: boolean
  visited: boolean
  eventDone: boolean
}

export type PlayerPosition = {
  x: number
  y: number
  direction: Direction
}

export type DungeonMap = {
  id: string
  name: string
  floor: number
  width: number
  height: number
  tiles: Tile[][]
  player: PlayerPosition
  visionRange: number
}