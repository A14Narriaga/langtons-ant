import "../scss/App.scss"
import Footer from "./Footer"
import Game from "./Game"
import Header from "./Header"

const App = () => {
  import("langtons-ant-algorithm").then(({ add_two_ints }) => {
    const sumResult = add_two_ints(100, 20)
    console.log("Sum", sumResult)
  })

  return (
    <>
      <Header />
      <Game />
      <Footer />
    </>
  )
}

export default App
