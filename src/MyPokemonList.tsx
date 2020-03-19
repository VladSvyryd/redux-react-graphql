import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Waypoint } from "react-waypoint";
// return type of request
interface ReturnDataType {
  pokemons: Pokemon[];
}
// request parameters type
interface PokemonVars {
  first: number;
}

interface Pokemon {
  id: number;
  name: string;
  weaknesses: Array<String>;
}
type MyPokemonListType = {
  counter: number;
};

const myPokemonQuery = gql`
  query GetPokemon($first: Int!) {
    pokemons(first: $first) {
      id
      name
      weaknesses
    }
  }
`;

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep() {
  console.log("start");
  await timeout(3000);
  console.log("end");
  return true;
}
export const MyPokemonList = ({ counter }: MyPokemonListType) => {
  const { loading, error, data, refetch, fetchMore } = useQuery<
    ReturnDataType,
    PokemonVars
  >(myPokemonQuery, {
    variables: { first: counter }
  });
  const handleWaypointEnter = (i: number) => {
    console.log(i);
    fetchMore({
      variables: {
        first: data?.pokemons.length
      },
      updateQuery: (prev: ReturnDataType, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          pokemons: [...prev.pokemons, ...fetchMoreResult.pokemons]
        });
      }
    });
  };
  const handleWaypointLeave = () => {
    console.log("leave", data);

    data && data.pokemons.shift();
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Èrror ${error.message}`}</p>;
  return (
    <div
      style={{ height: "270px", overflowY: "auto", border: "green 2px solid" }}
    >
      <ul>
        {data &&
          data.pokemons.map((p: Pokemon, i) => (
            <React.Fragment key={p.id}>
              <li>
                {p.name} :
                <ul>
                  weaknesses:
                  {p.weaknesses.map(w => (
                    <li key={w.toString()}>{w}</li>
                  ))}
                </ul>
              </li>
              {i === 0 && <Waypoint onLeave={() => handleWaypointLeave()} />}

              {i === data.pokemons.length - 1 && false && (
                <Waypoint onEnter={() => handleWaypointEnter(i)} />
              )}
            </React.Fragment>
          ))}
      </ul>
      <button onClick={() => sleep()}>Refetch</button>
    </div>
  );
};
