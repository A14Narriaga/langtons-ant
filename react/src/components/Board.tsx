import { useEffect } from "react"
import { memory } from "langtons-ant-algorithm/langtons_ant_algorithm_bg.wasm"
import { Grid, Ant } from "langtons-ant-algorithm"

const colorDead = "#FFFFFF"
const colorAlive = "#000000"
const cols = 206
const rows = 106
const space = 0.5
let cellSpace: number
let cellSize: number
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let board: Array<Array<number>>
let grid: Grid
let ant: Ant

const startGame = () => {
  grid.moveAnts()
  const numChanges = grid.getNumChanges()
  let changes = new Uint32Array(memory.buffer, grid.getChanges(), numChanges)
  console.log(changes)
  for (let i = 0; i < numChanges; i++) {
    const row = changes[i]
    const col = changes[i + 1]
    const state = board[row][col] ? 0 : 1
    board[row][col] = state
    context.fillStyle = state ? colorAlive : colorDead
    const dx = cellSpace * col + space
    const dy = cellSpace * row + space
    context.fillRect(dx, dy, cellSize, cellSize)
  }
}

const loadGame = () => {
  grid = Grid.new(rows, cols)
  grid.addAnt(53, 103)
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  context = canvas.getContext("2d") as CanvasRenderingContext2D
  cellSpace = cellSize + space
  canvas.width = cellSpace * cols + space
  canvas.height = cellSpace * rows + space
  board = Array.from(new Array(cols)).map(row => new Array(rows)) as Array<Array<number>>
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      //const state = y % 2 === 0 ? (x % 2 === 0 ? 0 : 1) : x % 2 === 0 ? 1 : 0
      board[x][y] = 0
      const dx = cellSpace * x + space
      const dy = cellSpace * y + space
      context.fillStyle = colorDead
      context.fillRect(dx, dy, cellSize, cellSize)
    }
  }
  setInterval(() => startGame(), 1);
}

const Game = ({ stateCellSize }: { stateCellSize: any }) => {
  useEffect(() => {
    cellSize = stateCellSize.size
    loadGame()
  }, [stateCellSize])

  return (
    <main>
      <section className="information">
        <ul>
          <li>Ants: 1</li>
          <li>Generation: 1959</li>
          <li>Cells: 10</li>
        </ul>
      </section>
      <section className="container">
        <div className="game-wrapper">
          <canvas id="canvas"></canvas>
        </div>
      </section>
    </main>
  )
}

export default Game
