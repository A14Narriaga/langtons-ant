import { useReducer } from "react"
import "../scss/App.scss"
import Footer from "./Footer"
import Board from "./Board"
import Header from "./Header"

function reducerCellSize(state: any, actions: any) {
  switch (actions.type) {
    case "zoomIn":
      return { size: state.size + 1 }
    case "zoomOut":
      return { size: state.size === 1 ? state.size : state.size - 1 }
    default:
      return state
  }
}

const App = () => {
  const [stateCellSize, dispatchCellSize] = useReducer(reducerCellSize, { size: 3 })
  return (
    <>
      <Header dispatchCellSize={dispatchCellSize} />
      <Board stateCellSize={stateCellSize} />
      <Footer />
    </>
  )
}

export default App
