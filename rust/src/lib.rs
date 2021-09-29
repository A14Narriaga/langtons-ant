// use rand::prelude::*;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

include!("cell.rs");
include!("ant.rs");
include!("movement.rs");

#[wasm_bindgen]
struct Grid {
	width: i32,
	height: i32,
	cells: Vec<Cell>,
	ants: Vec<Ant>,
	changes: Vec<i32>,
}

#[wasm_bindgen]
impl Grid {
	pub fn new(width: i32, height: i32) -> Grid {
		Grid {
			width,
			height,
			cells: (0..width * height).map(|_| Cell::Dead).collect(),
			ants: vec![],
			changes: vec![],
		}
	}
	
	pub fn getChanges(&self) -> *const i32 {
		self.changes.as_ptr()
	}

	pub fn getNumChanges(&self) -> usize {
		self.changes.len()
	}

	pub fn getAnts(&self) -> *const Ant {
		self.ants.as_ptr()
	}

	fn getIndex(&self, row: i32, col: i32) -> usize {
		(row * self.width + col).try_into().unwrap()
	}

	fn getCell(&self, row: i32, col: i32) -> Cell {
		self.cells[self.getIndex(row, col)]
	}

	pub fn addAnt(&mut self, row: i32, col: i32) {
		let id = self.ants.len();
		// let mut rng = rand::thread_rng();
		// let movement = getMovement(rng.gen_range(1, 4));
		let ant = Ant::new(id, row, col);
		self.ants.push(ant);
	}

	fn moveAlong(&self, m: Movement) -> (i32, i32) {
		match m {
			Movement::Up => return (-1, 0),
			Movement::Down => return (1, 0),
			Movement::Right => return (0, 1),
			Movement::Left => return (0, -1),
		}
	}

	pub fn moveAnts(&mut self) {
		let mut changes = vec![];
		for i in 0..self.ants.len() {
			let index = self.getIndex(self.ants[i].row, self.ants[i].col);
			changes.push(self.ants[i].row);
			changes.push(self.ants[i].col);
			let cell = self.cells[index];
			let mut idMovement = getIdMovement(self.ants[i].state);
			let movement;
			if cell == Cell::Dead {
				// turnRight
				idMovement += 1;
			} else {
				// turnLeft
				idMovement -= 1;
			}
			movement = getMovement(idMovement % 4);
			self.ants[i].state = movement;
			let newPosition = self.moveAlong(movement);
			self.ants[i].row = (self.ants[i].row + newPosition.0) % self.width;
			self.ants[i].col = (self.ants[i].col + newPosition.1) % self.height;
			if self.ants[i].row == -1 {
				self.ants[i].row = self.width - 1;
			}
			if self.ants[i].col == -1 {
				self.ants[i].col = self.height - 1;
			}
			self.cells[index].toggle();
		}
		self.changes = changes;
	}
}
