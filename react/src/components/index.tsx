import React, { Suspense } from "react";

const Main = React.lazy(() => import("./App"));

const App: React.FC = () => {
  return (
    <main>
      <div id="mainScreen">
        <Suspense fallback={null}>
          <Main />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
