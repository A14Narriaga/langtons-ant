import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Config = ({
  setShowConfig,
  rows,
  setRows,
  cols,
  setCols,
  toroide,
  setToroide,
  backgroundColor,
  setBackgroundColor,
}: {
  setShowConfig: any
  rows: number
  setRows: any
  cols: number
  setCols: any
  setToroide: any
  toroide: boolean
  backgroundColor: string
  setBackgroundColor: any
}) => {
  const [newRows, setNewRows] = useState(rows)
  const [newCols, setNewCols] = useState(cols)
  const [newBgColor, setNewBgColor] = useState(backgroundColor)

  const saveInfo = () => {
    if (!(newRows > 0 && newRows < 1001)) {
      toast.error("Row value ​​must be greater than 0 and less than 1001")
      return
    }
    if (!(newCols > 0 && newCols < 1001)) {
      toast.error("Col value ​​must be greater than 0 and less than 1001")
      return
    }
    setRows(newRows)
    setCols(newCols)
    setBackgroundColor(newBgColor)
    setShowConfig(false)
    toast("Board updated")
  }

  return (
    <>
      <section className="config">
        <div className="config-wrapper">
          <section className="config-header">
            <h1>Configuration</h1>
          </section>
          <section className="config-row">
            <div className="input-type">
              <label htmlFor="rows">Rows:</label>
              <input
                id="rows"
                type="number"
                value={newRows}
                onChange={e => setNewRows(Number(e.target.value))}
              />
            </div>
            <div className="input-type">
              <label htmlFor="cols">Cols:</label>
              <input
                id="cols"
                type="number"
                value={newCols}
                onChange={e => setNewCols(Number(e.target.value))}
              />
            </div>
          </section>
          <section className="config-row">
            <label htmlFor="plan">Plan:</label>
            <button
              className={`${toroide ? "" : "btn-disable"} space opc-plan`}
              onClick={() => setToroide(true)}
            >
              Toroide
            </button>
            <button
              className={`${toroide ? "btn-disable" : ""} opc-plan`}
              onClick={() => setToroide(false)}
            >
              Limitado
            </button>
          </section>
          <section className="config-row">
            <label htmlFor="background">Background:</label>
            <input
              type="color"
              id="background"
              value={newBgColor}
              onChange={e => setNewBgColor(e.target.value)}
            />
          </section>
          <button className="config-btn-acept" onClick={saveInfo}>
            Acept
          </button>
        </div>
      </section>
      <ToastContainer
        position="bottom-center"
				theme="colored"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Config
