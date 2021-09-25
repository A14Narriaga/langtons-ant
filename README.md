# React app with Rust using WebAssembly
- [Install npm](https://www.npmjs.com/get-npm)
- [Install cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

## Create App

#### Create directories
- Create app directory
```
mkdir <app_name>
```
- Create REACT App
```
npx yarn create react-app react --template typescript
```
- Create RUST App
```
cargo new rust
```

#### Inside RUST App
- Install wasm-pack
```
npm i wasm-pack
```
- Install wasm-loader
```
npm i --save-dev wasm-loader
```
- Configurate the Cargo.toml inside the RUST App
```
[package]
name = "<name_pkg>"
version = "0.1.0"
authors = ["A14Narriaga <a14n.arriaga@gmail.com>"]
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

#### Inside REACT App
- Install App Rewired
```
npm i react-app-rewired --save-dev
```
- Create a config-overrides.js file inside the root directory
```
const path = require("path");

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm$/;

  config.resolve.extensions.push(".wasm");

  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });

  config.module.rules.push({
    test: wasmExtensionRegExp,
    include: path.resolve(__dirname, "src"),
    use: [{ loader: require.resolve("wasm-loader"), options: {} }],
  });

  return config;
};
```
- 'Flip' the existing calls in package.json
```
"start": "react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired test",
"eject": "react-app-rewired eject",
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```
- Add the dependence inside the package.json
```
# ... another dependencies
  "<name_pkg>": "file:../rust/pkg",
}, 
# end of the dependencies
```
- Install the dependency
```
npm i
```

#### Compilation in RUST
```
npx wasm-pack build --out-dir ./pkg
```

#### Start REACT App
```
npm run start
```

## Clone App

- Inside de RUST App
```
npm i wasm-pack
npx wasm-pack build --out-dir ./pkg
```
- Inside de REACT App
```
npm i
npm run start
```

## Add deploy with GitHub
- Add github pages interaction
```
npm add gh-pages
```
- Add homepage in package.json
```
"version": "0.1.0",
  "homepage": https://github.com/A14Narriaga/langtons-ant",
  "dependencies": {
```
-- Deploy app
```
npm run predeploy
npm run deploy
```

## References
- [Rust and React](https://medium.com/swlh/intro-to-webassembly-in-react-with-rust-d067408231b9)
- [Config overrides](https://github.com/timarney/react-app-rewired)