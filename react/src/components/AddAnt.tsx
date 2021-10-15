import { GiAnt } from "react-icons/gi"

const AddAnt = () => {
  return (
    <section className="add-ant">
      <div className="ant-wrapper">
        <section className="config-ant">
          <button className="space config-position-ant">
            <GiAnt id="ant" />
          </button>
          <input className="space" type="color" id="ant-color" />
          <label htmlFor="x">x: </label>
          <input className="space coordeanate" type="number" id="x" />
          <label htmlFor="y">y: </label>
          <input className="space coordeanate" type="number" id="y" />
        </section>
				<button className="config-add-ant">Add</button>
      </div>
    </section>
  )
}

export default AddAnt
