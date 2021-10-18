import { useReducer, useState } from "react"
import "../scss/App.scss"
import Footer from "./Footer"
import Board from "./Board"
import Header from "./Header"
import Config from "./Config"
import AddAnt from "./AddAnt"

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
  const [reload, setReload] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [showAddAnt, setShowAddAnt] = useState(false)
  const [rows, setRows] = useState(10)
  const [cols, setCols] = useState(20)
  const [toroide, setToroide] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState("#c5c5c5")
  return (
    <>
      <Header
        dispatchCellSize={dispatchCellSize}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setReload={setReload}
        setShowConfig={setShowConfig}
        setShowAddAnt={setShowAddAnt}
      />
      <Board
        stateCellSize={stateCellSize}
        isRunning={isRunning}
        reload={reload}
        rows={rows}
        cols={cols}
        toroide={toroide}
        backgroundColor={backgroundColor}
      />
      <Footer />
      {showConfig && (
        <Config
          setShowConfig={setShowConfig}
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          setToroide={setToroide}
          toroide={toroide}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
      )}
      {showAddAnt && <AddAnt setShowAddAnt={setShowAddAnt} rows={rows} cols={cols} backgroundColor={backgroundColor}/>}
    </>
  )
}

export default App
