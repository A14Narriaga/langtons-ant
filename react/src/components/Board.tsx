import { useEffect } from "react"
// import { memory } from "langtons-ant-algorithm/langtons_ant_algorithm_bg.wasm";
import { Grid } from "langtons-ant-algorithm"

const cols = 206
const rows = 106
const space = 0.5
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let board: Array<Array<number>>
let grid: Grid

const loadGame = (cellSize: number) => {
  grid = Grid.new(10, 10)
  grid.addAnt(3, 3)
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  context = canvas.getContext("2d") as CanvasRenderingContext2D
  const cellSpace = cellSize + space
  canvas.width = cellSpace * cols + space
  canvas.height = cellSpace * rows + space
  board = Array.from(new Array(cols)).map(row => new Array(rows)) as Array<Array<number>>
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      const state = y % 2 === 0 ? (x % 2 === 0 ? 0 : 1) : x % 2 === 0 ? 1 : 0
      board[x][y] = state
      const dx = cellSpace * x + space
      const dy = cellSpace * y + space
      context.fillStyle = state === 1 ? "#FFFFFF" : "#45C53F"
      context.fillRect(dx, dy, cellSize, cellSize)
    }
  }
}

const Game = ({ stateCellSize }: { stateCellSize: any }) => {
  useEffect(() => {
    loadGame(stateCellSize.size)
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
