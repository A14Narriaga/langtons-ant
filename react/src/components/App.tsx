import { useReducer, useState } from "react"
import "../scss/App.scss"
import Footer from "./Footer"
import Board from "./Board"
import Header from "./Header"

const reducerCellSize = (state: any, actions: any) => {
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
  const [isRunning, setIsRunning] = useState(true)
  return (
    <>
      <Header 
        dispatchCellSize={dispatchCellSize}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
      <Board 
        stateCellSize={stateCellSize}
        isRunning={isRunning}
      />
      <Footer />
    </>
  )
}

export default App
