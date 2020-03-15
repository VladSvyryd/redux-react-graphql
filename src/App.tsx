import React from "react";
import { useDispatch } from "react-redux";
import { useReduxSelector } from "./store/us";

import "./App.css";
import { Counter, INCREMENT, STORE_RESULT, DELETE_RESULT } from "./store/types";

function App() {
  const store = useReduxSelector<Counter>(store => store);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <span>Number : </span>
          <span>{store.counter}</span>
        </div>
        <div>
          <button onClick={() => dispatch({ type: INCREMENT })}>PLUS</button>
        </div>
        <hr />
        <button onClick={() => dispatch({ type: STORE_RESULT })}>
          Store Result
        </button>
        <ul>
          {store.result.map(r => (
            <li
              key={r.id.toString()}
              onClick={() =>
                dispatch({
                  type: DELETE_RESULT,
                  payload: r.id.toString()
                })
              }
            >
              {r.value}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
