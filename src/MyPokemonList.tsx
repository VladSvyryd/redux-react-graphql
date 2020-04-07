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
  number: number;
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
      number
    }
  }
`;

function timeout<Promise>(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    variables: { first: counter },
  });
  const handleWaypointEnter = (i: number) => {
    console.log(i);
    fetchMore({
      variables: {
        first: data?.pokemons.length,
      },
      updateQuery: (prev: ReturnDataType, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          pokemons: [...prev.pokemons, ...fetchMoreResult.pokemons],
        });
      },
    });
  };
  const handleWaypointLeave = () => {
    console.log("leave", data);

    data && data.pokemons.shift();
  };

  if (error) return <p>{`Èrror ${error.message}`}</p>;
  return (
    <div
      style={{
        display: "grid",
        width: "90%",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridGap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        maxHeight: "453px",
        overflowY: "auto",
      }}
    >
      {data &&
        data.pokemons.map((p: Pokemon, i) => (
          <div key={p.id} style={{ maxWidth: "200px" }}>
            <img
              src={`https://img.pokemondb.net/artwork/${String(
                p.name
              ).toLocaleLowerCase()}.jpg`}
              alt=""
              width="100"
              height="100"
            />
            <div>{p.number + " " + p.name}</div>
          </div>
        ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};
