#[derive(Clone, Copy, Debug, PartialEq, Eq)]

pub enum Movement {
	Up,
	Right,
	Down,
	Left,
}

pub fn getMovement(id: u8) -> Movement {
	match id {
		1 => return Movement::Down,
		2 => return Movement::Left,
		3 => return Movement::Up,
		_ => return Movement::Right,
	};
}

pub fn getIdMovement(m: Movement) -> u8 {
	match m {
		Movement::Down => return 1,
		Movement::Left => return 2,
		Movement::Up => return 3,
		_ => return 4,
	};
}
