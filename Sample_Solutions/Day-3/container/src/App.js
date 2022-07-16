import React, {Suspense} from 'react';
import './App.css';

const CounterComponent = React.lazy(() => import("counter/Counter"));
const Pow2Component = React.lazy(() => import("pow2/Pow2"));

function App() {
  return (
    <div className="App">
      <h1>Container App</h1>
        <Suspense fallback={"Loading..."}>
          <CounterComponent />
          <Pow2Component />
        </Suspense>
    </div>
  );
}

export default App;