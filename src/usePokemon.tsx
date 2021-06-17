import React, { useEffect, useState } from "react";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const loadData = async () => {
    // I had to take your data and upload it to jsonbin in order to access it via fetch.
    // The original source you provided does not allow CORS
    const resp = await fetch(
      "https://api.jsonbin.io/b/60c973b95ed58625fd117547",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    setPokemon(json.pokemon);
  };
  useEffect(() => {
    loadData();
  }, []);
  return { pokemon, loadData };
};

export interface Pokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: pokeType[];
  height: string;
  weight: string;
  candy: string;
  candy_count: number;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[];
  weaknesses: pokeType[];
  next_evolution: pokeEvolution[];
  prev_evolution: pokeEvolution[];
}

interface pokeEvolution {
  num: string;
  name: string;
}

type pokeType =
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";

export const listOfTypes = [
  { Name: "Bug", Id: 0 },
  { Name: "Dark", Id: 0 },
  { Name: "Dragon", Id: 0 },
  { Name: "Electric", Id: 0 },
  { Name: "Fairy", Id: 0 },
  { Name: "Fighting", Id: 0 },
  { Name: "Fire", Id: 0 },
  { Name: "Flying", Id: 0 },
  { Name: "Ghost", Id: 0 },
  { Name: "Grass", Id: 0 },
  { Name: "Ground", Id: 0 },
  { Name: "Ice", Id: 0 },
  { Name: "Normal", Id: 0 },
  { Name: "Poison", Id: 0 },
  { Name: "Psychic", Id: 0 },
  { Name: "Rock", Id: 0 },
  { Name: "Steel", Id: 0 },
  { Name: "Water", Id: 0 },
];
export interface typeOption {
  Name: pokeType;
  Id: number;
}
