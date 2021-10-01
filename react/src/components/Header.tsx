import { FaRegEdit, FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa"
import { BiZoomIn, BiZoomOut } from "react-icons/bi"
import { HiOutlineFolderDownload } from "react-icons/hi"
import { AiOutlineAreaChart, AiOutlineReload } from "react-icons/ai"
import { GiAnt } from "react-icons/gi"

const Header = ({
  dispatchCellSize,
  isRunning,
  setIsRunning,
}: {
  dispatchCellSize: any
  isRunning: boolean
  setIsRunning: any
}) => {

  return (
    <header>
      <section className="header-container">
        <h1>Langton's ant</h1>
        <div className="options">
          <li>
            <a href="#!">
              <AiOutlineReload />
            </a>
          </li>
          <li onClick={() => setIsRunning(isRunning ? false : true)}>
            <a href="#!">{isRunning ? <FaRegPauseCircle /> : <FaRegPlayCircle />}</a>
          </li>
          <li onClick={() => dispatchCellSize({ type: "zoomIn" })}>
            <a href="#!">
              <BiZoomIn />
            </a>
          </li>
          <li onClick={() => dispatchCellSize({ type: "zoomOut" })}>
            <a href="#!">
              <BiZoomOut />
            </a>
          </li>
          <li>
            <a href="#!">
              <GiAnt />
            </a>
          </li>
          <li>
            <a href="#!">
              <HiOutlineFolderDownload />
            </a>
          </li>
          <li>
            <a href="#!">
              <FaRegEdit />
            </a>
          </li>
          <li>
            <a href="#!">
              <AiOutlineAreaChart />
            </a>
          </li>
        </div>
      </section>
    </header>
  )
}

export default Header
