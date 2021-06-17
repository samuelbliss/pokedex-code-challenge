import React, { useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Pokemon } from "../usePokemon";

interface PokeDetailProps {
  pokemons: Pokemon[];
}
export const PokeDetail = ({ pokemons }: PokeDetailProps) => {
  const params = useParams<{ num: string }>();
  const { push } = useHistory();
  const pokemon = useMemo(
    () => pokemons.find((p) => p.num === params.num),
    [params, pokemons]
  );
  return (
    <div className="DetailContainer">
      <div>
        <div>
          <button
            onClick={() => {
              push("/");
            }}
          >
            Back Home
          </button>
        </div>
        <div>
          <text>
            {pokemon?.name} - {pokemon?.num}
          </text>
        </div>
      </div>
      <div className="Detail">
        <div className="column">
          <img src={pokemon?.img} alt={pokemon?.name} />
        </div>
        <div className="column">
          <div>Type: {pokemon?.type.join(", ")}</div>
          <div>Weaknesses: {pokemon?.weaknesses.join(", ")}</div>
          <div>
            Height: {pokemon?.height} - Weight: {pokemon?.weight}
          </div>
          <div>
            Previous Evolution:{" "}
            {pokemon && pokemon.prev_evolution?.length > 0 ? (
              <text
                onClick={() =>
                  push(
                    `/pokemonDetail/${
                      pokemon.prev_evolution[pokemon.prev_evolution.length - 1]
                        .num
                    }`
                  )
                }
                className="link"
              >
                {pokemon.prev_evolution[pokemon.prev_evolution.length - 1].name}
              </text>
            ) : (
              "None"
            )}
          </div>
          <div>
            Next Evolution:{" "}
            {pokemon && pokemon.next_evolution?.length > 0 ? (
              <text
                onClick={() =>
                  push(`/pokemonDetail/${pokemon.next_evolution[0].num}`)
                }
                className="link"
              >
                {pokemon.next_evolution[0].name}
              </text>
            ) : (
              "None"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
