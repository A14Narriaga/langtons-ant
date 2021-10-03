import { FaRegEdit, FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa"
import { BiZoomIn, BiZoomOut } from "react-icons/bi"
import { HiOutlineFolderDownload } from "react-icons/hi"
import { AiOutlineAreaChart, AiOutlineReload } from "react-icons/ai"

const Header = ({
  dispatchCellSize,
  isRunning,
  setIsRunning,
  setReload,
  setShowConfig
}: {
  dispatchCellSize: any
  isRunning: boolean
  setIsRunning: any
  setReload: any
  setShowConfig: any
}) => {

  return (
    <header>
      <section className="header-container">
        <h1>Langton's ant</h1>
        <div className="options">
          <li onClick={() => setReload((reload: boolean) => reload ? false : true)}>
            <a href="#!">
              <AiOutlineReload />
            </a>
          </li>
          <li onClick={() => setIsRunning((running: boolean) => running ? false : true)}>
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
              <HiOutlineFolderDownload />
            </a>
          </li>
          <li>
            <a href="#!">
              <AiOutlineAreaChart />
            </a>
          </li>
          <li onClick={() => setShowConfig((show: boolean) => show ? false : true)}>
            <a href="#!">
              <FaRegEdit />
            </a>
          </li>
        </div>
      </section>
    </header>
  )
}

export default Header
