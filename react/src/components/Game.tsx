import { useEffect } from "react"

const cellSize = 5
let cellSpace = cellSize + 1
const cols = 1000
const rows = 1000
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let board: Array<Array<Cell>>

class Cell {
  x: number
  y: number
  state: number
  constructor(x: number, y: number, state: number) {
    this.x = x
    this.y = y
    this.state = state
  }
  paint = () => {
    if (context !== null) {
      context.fillStyle = this.state === 1 ? "#E1EA7F" : "#45C53F"
      // fillRect(x, y, width, height)
      const x = cellSpace * this.x + 1
      const y = cellSpace * this.y + 1
      context.fillRect(x, y, cellSize, cellSize)
    }
  }
}

const loadGame = () => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  context = canvas.getContext("2d") as CanvasRenderingContext2D
  canvas.width = cellSpace * cols + 1
  canvas.height = cellSpace * rows + 1
  board = Array.from(new Array(cols)).map(row => new Array(rows)) as Array<Array<Cell>>
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      // const state = Math.floor(Math.random() * 2)
      const state = y % 2 === 0 ? (x % 2 === 0 ? 0 : 1) : x % 2 === 0 ? 1 : 0
      board[x][y] = new Cell(x, y, state)
      board[x][y].paint()
    }
  }
}

const Game = () => {
  useEffect(() => {
    loadGame()
  }, [])

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
