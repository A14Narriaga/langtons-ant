#[derive(Clone, Copy, Debug, PartialEq, Eq)]

struct Ant {
	id: usize,
	state: Movement,
	row: i32,
	col: i32,
}

impl Ant {
	pub fn new(_id: usize, _row: i32, _col: i32) -> Ant {
		Ant {
			id: _id,
			row: _row,
			col: _col,
			state: Movement::Down,
		}
	}
}