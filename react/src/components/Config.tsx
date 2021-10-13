import { GiAnt } from "react-icons/gi"
import { RiCloseLine } from "react-icons/ri"
import { MdAdd } from "react-icons/md"

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
  return (
    <section className="config">
      <div className="config-wrapper">
        <section className="config-close">
          <h1>Configuration</h1>
          <RiCloseLine className="close" onClick={() => setShowConfig(false)} />
        </section>
        <section className="config-row">
          <div className="input-type">
            <label htmlFor="rows">Rows:</label>
            <input id="rows" type="number" value={rows} onChange={e => setRows(e.target.value)} />
          </div>
          <div className="input-type">
            <label htmlFor="cols">Cols:</label>
            <input id="cols" type="number" value={cols} onChange={e => setCols(e.target.value)} />
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
            value={backgroundColor}
            onChange={e => setBackgroundColor(e.target.value)}
          />
        </section>
        <hr />
        <p>Ants</p>
        <section className="config-ant">
          <button className="space config-position-ant">
            <GiAnt id="ant" />
          </button>
          <input className="space" type="color" id="ant-color" />
          <label htmlFor="x">x: </label>
          <input className="space coordeanate" type="number" id="x" />
          <label htmlFor="y">y: </label>
          <input className="space coordeanate" type="number" id="y" />
          <button className="config-add-ant">
            <MdAdd />
          </button>
        </section>
      </div>
    </section>
  )
}

export default Config
