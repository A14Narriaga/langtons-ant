import { GiAnt } from "react-icons/gi"
import { RiCloseLine } from "react-icons/ri"
import { MdAdd } from "react-icons/md"

const Config = ({ setShowConfig }: { setShowConfig: any }) => {
  return (
    <section className="config">
      <div className="config-wrapper">
        <section className="config-close">
          <h1>Configuration</h1>
          <RiCloseLine
            className="close"
            onClick={() => setShowConfig((show: boolean) => (show ? false : true))}
          />
        </section>
        <section className="config-row">
          <div className="input-type">
            <label htmlFor="rows">Rows:</label>
            <input id="rows" type="number" />
          </div>
          <div className="input-type">
            <label htmlFor="cols">Cols:</label>
            <input id="cols" type="number" />
          </div>
        </section>
        <section className="config-row">
          <label htmlFor="plan">Plan:</label>
          <button className="btn-disable space opc-plan">Toroide</button>
          <button className="opc-plan">Limitado</button>
        </section>
        <section className="config-row">
          <label htmlFor="background">Background:</label>
          <input type="color" id="background" />
        </section>
        <hr />
        <p>Ants</p>
        <section className="config-ant">
          <label htmlFor="ant">Position: </label>
          <button className="space config-position-ant">
            <GiAnt id="ant" />
          </button>
          <label htmlFor="ant-color">Color: </label>
          <input className="space" type="color" id="ant-color" />
          <label htmlFor="x">x: </label>
          <input className="space" type="number" id="x" />
          <label htmlFor="y">y: </label>
          <input className="space" type="number" id="y" />
          <button className="config-add-ant">
            <MdAdd />
          </button>
        </section>
      </div>
    </section>
  )
}

export default Config
