import { GiAnt } from "react-icons/gi"
import { RiCloseLine, RiAddCircleLine } from "react-icons/ri"

const Config = ({setShowConfig}:{setShowConfig:any}) => {
  return (
    <section className="config">
      <div className="config-wrapper">
        <section className="config-close">
          <h1>Configuration</h1>
          <RiCloseLine className="close" onClick={() => setShowConfig((show: boolean) => show ? false : true)}/>
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
          <button className="disable-btn">Toroide</button>
          <button>Limitado</button>
        </section>
        <section className="config-row">
          <label htmlFor="background">Background:</label>
          <input type="color" id="background" />
        </section>
        <hr />
        <p>Ants</p>
        <section className="config-row">
          <label htmlFor="ant">Position: </label>
          <button className="config-btn-ant">
            <GiAnt className="config-ant" id="ant" />
          </button>
          <label htmlFor="color">Color: </label>
          <input type="color" id="color"/>
        </section>
        <button className="config-add">
          <RiAddCircleLine />
          <p>Add ant</p>
        </button>
      </div>
    </section>
  )
}

export default Config
