import { GoGraph } from "react-icons/go"
import { FaRegEdit, FaRegPlayCircle } from "react-icons/fa"
import { HiOutlineFolderDownload } from "react-icons/hi"

const Header = () => {
  return (
    <header>
      <section className="header-container">
        <h1>Langton's ant</h1>
        <div className="options">
          <li>
            <a href="#!">
              <FaRegPlayCircle />
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
              <GoGraph />
            </a>
          </li>
        </div>
      </section>
    </header>
  )
}

export default Header
