import React from "react";
import { useDispatch } from "react-redux";
import { useReduxSelector } from "./store/us";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import {
  Counter,
  INCREMENT,
  DECREMENT,
  STORE_RESULT,
  DELETE_RESULT
} from "./store/types";
import { MyPokemonList } from "./MyPokemonList";
export const link = createHttpLink({
  uri: "https://graphql-pokemon.now.sh"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

function App() {
  const store = useReduxSelector<Counter>(store => store);
  const dispatch = useDispatch();

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <MyPokemonList counter={store.counter} />
            <span>Number : </span>
            <span>{store.counter}</span>
          </div>
          <div>
            <button onClick={() => dispatch({ type: INCREMENT })}>PLUS</button>
            <button onClick={() => dispatch({ type: DECREMENT })}>MINUS</button>
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
    </ApolloProvider>
  );
}
export default App;
