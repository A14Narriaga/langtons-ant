// use rand::prelude::*;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

include!("cell.rs");
include!("ant.rs");
include!("movement.rs");

# [wasm_bindgen]
pub struct Grid {
	width: i32,
	height: i32,
	cells: Vec<Cell>,
	ants: Vec<Ant>,
}

# [wasm_bindgen]
impl Grid {
	pub fn new(_width: i32, _height: i32) -> Grid {
		Grid {
			width: _width,
			height: _height,
			cells: (0.._width * _height).map(|_| Cell::Dead ).collect(),
			ants: Vec::new(),
		}
	}

	fn getIndex(&self, row: i32, col: i32) -> usize {
		(row * self.width + col).try_into().unwrap()
	}

	fn getCell(&self, row: i32, col: i32) -> Cell {
		self.cells[self.getIndex(row, col)]
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
		for i in 0..self.ants.len() {
			let index = self.getIndex(self.ants[i].row, self.ants[i].col);
			let cell = self.cells[index];
			let mut idMovement = getIdMovement(self.ants[i].state);
			let movement;
			if cell == Cell::Dead { // turnRight
				idMovement += 1;
			}
			else { // turnLeft
				idMovement -= 1;
			}
			movement = getMovement(idMovement%4);
			self.ants[i].state = movement;
			let newPosition = self.moveAlong(movement);
			self.ants[i].row = (self.ants[i].row + newPosition.0)%self.width;
			self.ants[i].col = (self.ants[i].col + newPosition.1)%self.height;
			if self.ants[i].row == -1 {
				self.ants[i].row = self.width-1;
			}
			if self.ants[i].col == -1 {
				self.ants[i].col = self.height-1;
			}
			self.cells[index].toggle();
		}
	}

	pub fn addAnt(&mut self, row: i32, col: i32) {
		let id = self.ants.len();
		// let mut rng = rand::thread_rng();
		// let movement = getMovement(rng.gen_range(1, 4));
		let ant = Ant::new(id, row, col);
		self.ants.push(ant);
	}

	pub fn printAnts(&self) {
		println!("------------------------------------------------");
		for ant in self.ants.iter() {
			println!("{:?}", ant);
		}
	}

	pub fn printGrid(&self) { 
		println!("------------------------------------------------");
		for row in 0..self.width {
			for col in 0..self.height {
				let cell = self.getCell(row, col);
				print!("{} ", if cell == Cell::Alive {1} else {0});
			}
			println!("");
		}
		println!("------------------------------------------------");
	}
}
