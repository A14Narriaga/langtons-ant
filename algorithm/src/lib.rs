use wasm_bindgen :: prelude :: *;

# [wasm_bindgen]
pub fn add_two_ints(a: u32, b:u32) -> u32 {
    a+b
}

# [wasm_bindgen]
pub fn multiply_two_ints(a: u32, b:u32) -> u32 {
    a*b
}

# [wasm_bindgen]
pub struct Board {
    width: u32, 
    height: u32,
}
