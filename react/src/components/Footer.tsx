import { FaUserCircle } from "react-icons/fa"
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai"

const Footer = () => {
  return (
    <footer>
      <section className="footer-container">
        <h3>By Alan Arriaga</h3>
        <div className="options">
          <a href="https://github.com/A14Narriaga" target="blank">
            <AiFillGithub />
          </a>
          <a href="https://a14narriaga.netlify.app/" target="blank">
            <FaUserCircle />
          </a>
          <a href="https://twitter.com/A14Narriaga" target="blank">
            <AiOutlineTwitter />
          </a>
        </div>
      </section>
    </footer>
  )
}

export default Footer
