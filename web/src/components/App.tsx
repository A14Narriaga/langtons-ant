import "../scss/App.scss"
import Footer from "./Footer"
import Game from "./Game"
import Header from "./Header"

const App = () => {
  import("algorithm").then(({ add_two_ints, multiply_two_ints }) => {
    const sumResult = add_two_ints(100, 20)
    const mulResult = multiply_two_ints(5, 5)
    console.log("Sum", sumResult)
    console.log("Mul", mulResult)
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
