import { useReducer } from "react"
// import { memory } from "langtons-ant-algorithm/langtons_ant_algorithm_bg.wasm";
// import { Universe, Cell } from "langtons-ant-algorithm";
import "../scss/App.scss"
import Footer from "./Footer"
import Grid from "./Grid"
import Header from "./Header"

import("langtons-ant-algorithm").then(({ add_two_ints }) => {
  const sumResult = add_two_ints(100, 20)
  console.log("Sum", sumResult)
})

function reducerCellSize(state: any, actions: any) {
  switch (actions.type) {
    case "zoomIn":
      return { size: state.size + 1 }
    case "zoomOut":
      return { size: state.size === 4 ? state.size : state.size - 1 }
    default:
      return state
  }
}

const App = () => {
  const [stateCellSize, dispatchCellSize] = useReducer(reducerCellSize, { size: 4 })

  return (
    <>
      <Header dispatchCellSize={dispatchCellSize} />
      <Grid stateCellSize={stateCellSize} />
      <Footer />
    </>
  )
}

export default App
