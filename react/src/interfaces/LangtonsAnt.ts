import { memory } from "langtons-ant-algorithm/langtons_ant_algorithm_bg.wasm"
import { Grid } from "langtons-ant-algorithm"
import Ant from "../interfaces/Ant"

let colorAlive: string
let cols: number
let rows: number
let space: number
let cellSpace: number
let cellSize: number
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D
let board: Array<Array<number>>
let grid: Grid

const create = (data: {
	rows: number;
	cols: number;
	cellSize: number;
}) => {
	colorAlive = "#000000";
	cols = data.cols;
	rows = data.rows;
	space = 1;
	cellSpace = cellSize + space
	const grid = Grid.new(rows, cols)
	loadCanvas();
}

const loadCanvas = () => {
	canvas = document.getElementById("canvas") as HTMLCanvasElement
	context = canvas.getContext("2d") as CanvasRenderingContext2D
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

