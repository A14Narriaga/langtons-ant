import React, { Suspense } from "react"

const Main = React.lazy(() => import("./App"))

const App: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Main />
    </Suspense>
  )
}

export default App
