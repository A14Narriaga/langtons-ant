import { useEffect } from "react"
import { memory } from "langtons-ant-algorithm/langtons_ant_algorithm_bg.wasm"
import { Grid } from "langtons-ant-algorithm"

const colorAlive = "#000000"
const cols = 180
const rows = 130
const space = 1
let colorDead: string
let cellSpace: number
let cellSize: number
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let board: Array<Array<number>>
let grid: Grid

const start = () => {
  grid.moveAnts()
  const numChanges = grid.getNumChanges()
  let changes = new Uint32Array(memory.buffer, grid.getChanges(), numChanges)
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

const reloadBoard = () => {
  cellSpace = cellSize + space
  canvas.width = cellSpace * cols + space
  canvas.height = cellSpace * rows + space
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const state = board[y][x]
      context.fillStyle = state ? colorAlive : colorDead
      const dx = cellSpace * x + space
      const dy = cellSpace * y + space
      context.fillRect(dx, dy, cellSize, cellSize)
    }
  }
}

const loadBoard = (rs: number, cs: number, toroide: boolean) => {
  console.log(rs, cs, toroide, colorDead)
  grid = Grid.new(rows, cols)
  grid.addAnt(65, 90)
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  context = canvas.getContext("2d") as CanvasRenderingContext2D
  board = Array.from(new Array(cols)).map(row => new Array(rows)) as Array<Array<number>>
  cellSpace = cellSize + space
  canvas.width = cellSpace * cols + space
  canvas.height = cellSpace * rows + space
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      board[y][x] = 0
      const dx = cellSpace * x + space
      const dy = cellSpace * y + space
      context.fillStyle = colorDead
      context.fillRect(dx, dy, cellSize, cellSize)
    }
  }
  canvas.onclick = event => {
    const boundingRect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / boundingRect.width
    const scaleY = canvas.height / boundingRect.height
    const canvasLeft = (event.clientX - boundingRect.left) * scaleX
    const canvasTop = (event.clientY - boundingRect.top) * scaleY
    const row = Math.min(Math.floor(canvasTop / cellSpace), rows - 1)
    const col = Math.min(Math.floor(canvasLeft / cellSpace), cols - 1)
    // universe.toggle_cell(row, col)
    context.fillStyle = colorAlive
    const x = col * cellSpace + 1
    const y = row * cellSpace + 1
    context.fillRect(x, y, cellSpace, cellSpace)
  }
}

const Board = ({
  stateCellSize,
  isRunning,
  reload,
  rows,
  cols,
  toroide,
  backgroundColor
}: {
  stateCellSize: any
  isRunning: boolean
  reload: boolean
  rows: number
  cols: number
  toroide: boolean
  backgroundColor: string
}) => {
  useEffect(() => {
    loadBoard(rows, cols, toroide)
  }, [reload, rows, cols, toroide])

  useEffect(() => {
    console.log(backgroundColor)
    colorDead = backgroundColor
    reloadBoard()
  }, [backgroundColor])

  useEffect(() => {
    cellSize = stateCellSize.size
    reloadBoard()
  }, [stateCellSize])

  useEffect(() => {
    setInterval(() => start(), 1)
  }, [isRunning])

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

export default Board
