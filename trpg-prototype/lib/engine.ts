export function rollDice(sides: number) {
  return Math.floor(Math.random() * sides) + 1
}

export function rollStat() {
  return rollDice(6) + rollDice(6) + rollDice(6)
}

export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}