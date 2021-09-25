import { useEffect } from "react"

// rows = x = w
// cols = y = h

const canvasW = 944
const canvasH = 464
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
const rows = 70
const cols = 70
let board: Array<Array<Cell>>
let cellH: number
let cellW: number

const cleanBoard = () => {
  canvas.width = canvasW
  canvas.height = canvasH
}

const paintBoard = () => {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      board[x][y].paint()
    }
  }
}

const reloadBoard = () => {
  cleanBoard()
  paintBoard()
  console.log("fotograma")
}

const loadBoard = () => {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      // const state = Math.floor(Math.random() * 2)
      const state = y % 2 === 0 ? (x % 2 === 0 ? 0 : 1) : x % 2 === 0 ? 1 : 0
      board[x][y] = new Cell(x, y, state)
    }
  }
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      board[x][y].getNeighbors()
    }
  }
}

const loadGame = ({ fps }: { fps: number }) => {
  canvas = document.getElementById("canvas") as HTMLCanvasElement
  context = canvas.getContext("2d") as CanvasRenderingContext2D
  canvas.width = canvasW
  canvas.height = canvasH
  cellW = Math.ceil(canvasW / rows)
  cellH = Math.ceil(canvasH / cols)
  board = Array.from(new Array(rows)).map(row => new Array(cols)) as Array<Array<Cell>>
  loadBoard()
  setInterval(() => reloadBoard(), 1000 / fps)
}

class Cell {
  x: number
  y: number
  state: number
  nextState: number
  neighbors: Array<Cell>
  constructor(x: number, y: number, state: number) {
    this.x = x
    this.y = y
    this.state = state
    this.nextState = state
    this.neighbors = new Array<Cell>(8)
  }
  getNeighbors = () => {
    const moveAxis = [-1, 0, 1]
    for (const dx of moveAxis) {
      for (const dy of moveAxis) {
        if (dx === 0 && dy === 0) continue
        const neighborX = (this.x + dx + rows) % rows
        const neighborY = (this.y + dy + cols) % cols
        this.neighbors.push(board[neighborX]?.[neighborY])
      }
    }
  }
  paint = () => {
    if (context !== null) {
      context.fillStyle = this.state === 1 ? "#FFFFFF" : "#000000"
      context.fillRect(this.x * cellW, this.y * cellH, cellW, cellH)
    }
  }
}

const Game = () => {
  useEffect(() => {
    loadGame({ fps: 30 })
  }, [])

  return (
    <main>
      <section className="container">
        <div className="game-wrapper">
          <canvas id="canvas"></canvas>
        </div>
      </section>
    </main>
  )
}

export default Game
