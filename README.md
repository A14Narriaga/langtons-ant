# React app with Rust using WebAssembly

- [Install npm](https://www.npmjs.com/get-npm)
- [Install cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

- Create root directory
```
mkdir <root_dir_name>
```
- Create React App
```
npx yarn create react-app <react_dir_name> --template typescript
```
- Install wasm-pack
```
npx wasm-pack
```
- Install wasm-loader
```
npm install --save-dev wasm-loader
```
- Install React App Rewired
```
npm install react-app-rewired --save-dev
```
- Create Rust App
```
cargo new <rust_dir_name>
```
- Configurate the Cargo.toml inside the Rust App
```
[package]
name = "<name_pkg>"
version = "0.1.0"
authors = ["A14Narriaga <a14.arriaga@gmail.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]

[features]
default = []

[dependencies]
wasm-bindgen = "0.2"
rand = { version = "0.7.3", features = ["wasm-bindgen"] }
wee_alloc = { version = "0.4.2", optional = true }

[profile.release]
# Tell `rustc` to optimize for small code size.
opt-level = "s"
```
- Create the lib.rs file and add code. (Delete the main.rs)
```
use wasm_bindgen :: prelude :: *;

# [wasm_bindgen]
pub fn add_two_ints(a: u32, b:u32) -> u32 {
    a+b
}
```
- Complitario of Rust (Inside the Rust App directory)
```
wasm-pack build --out-dir ../<build_output_dir_name>
```
- Add the dependence of our output inside the package.json from the React App
```
# ... another dependencies
   "<dependencie_name>": "File:../<build_output_dir_name>", 
}, # end of the dependencies
```
- In the React App install the dependencies
```
npm install / npm i
```
- Create the React App code
```
import("algorithm").then(({ add_two_ints }) => {
    const sumResult = add_two_ints(50, 20)
    console.log("Sum", sumResult)
  }
)
```
- Create a config-overrides.js file in the root directory
```
const path = require("path")

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm$/

  config.resolve.extensions.push(".wasm")

  config.module.rules.forEach(rule => {
    ;(rule.oneOf || []).forEach(oneOf => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp)
      }
    })
  })

  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, "src"),
    use: [{ loader: require.resolve("wasm-loader"), options: {} }],
  })

  return config
}
```
- 'Flip' the existing calls in package.json in React App
```
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
```
- Start the aplication
```
npx yarn start
```
# To make changes in the Rust we need to generate the new WASM file
```
npx wasm-pack build --out-dir ../<build_output_dir_name>
```
# References
- [Rust and React](https://medium.com/swlh/intro-to-webassembly-in-react-with-rust-d067408231b9)
- [Config overrides](https://github.com/timarney/react-app-rewired)