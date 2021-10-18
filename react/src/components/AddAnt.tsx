import { useState } from "react"
import { GiAnt } from "react-icons/gi"
import { IoClose } from "react-icons/io5"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AddAnt = ({
  setShowAddAnt,
  rows,
  cols,
	backgroundColor
}: {
  setShowAddAnt: any
  rows: number
  cols: number
	backgroundColor: string
}) => {
  const [color, setColor] = useState("black")
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [position, setPosition] = useState("0")

  const saveInfo = () => {
    if (!(x > 0 && x < rows+1)) {
      toast.error(`X value ​​must be greater than 0 and less than ${rows}`)
      return
    }
    if (!(y > 0 && y < cols+1)) {
      toast.error(`Col value ​​must be greater than 0 and less than ${color}`)
      return
    }
		setShowAddAnt(false)
  }

  const moveAnt = () => {
    switch (position) {
      case "0":
        setPosition("-90deg")
        break
      case "-90deg":
        setPosition("-180deg")
        break
      case "-180deg":
        setPosition("-270deg")
        break
      case "-270deg":
        setPosition("0")
        break
    }
  }

  return (
    <>
      <section className="add-ant">
        <div className="ant-wrapper">
          <section className="ant-header">
            <IoClose className="close" onClick={() => setShowAddAnt(false)} />
          </section>
          <section className="config-ant">
            <button className="space config-position-ant" onClick={moveAnt}>
              <GiAnt id="ant" style={{ transform: `rotate(${position})`, color: color, backgroundColor: backgroundColor}} />
            </button>
            <input
              className="space"
              type="color"
              id="ant-color"
              onChange={e => setColor(e.target.value)}
            />
            <label htmlFor="x">x: </label>
            <input
              className="space coordeanate"
              type="number"
              id="x"
              onChange={e => setX(Number(e.target.value))}
            />
            <label htmlFor="y">y: </label>
            <input
              className="space coordeanate"
              type="number"
              id="y"
              onChange={e => setY(Number(e.target.value))}
            />
          </section>
          <button className="config-add-ant" onClick={saveInfo}>
            Add
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

export default AddAnt
