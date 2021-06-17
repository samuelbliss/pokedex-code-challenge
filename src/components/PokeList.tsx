import React, { useMemo, useState } from "react";
import { listOfTypes, Pokemon, typeOption } from "../usePokemon";
import { Multiselect } from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";
interface PokeListProps {
  pokeData: Pokemon[];
}
export const PokeList = ({ pokeData }: PokeListProps) => {
  const { push } = useHistory();
  const onPokePress = (p: Pokemon) => push(`/pokemonDetail/${p.num}`);
  const [search, setSearch] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<typeOption[]>(
    []
  );
  const [selectedWeaknessFilter, setSelectedWeaknessFilter] = useState<
    typeOption[]
  >([]);
  const displayPokemon = useMemo(() => {
    let list = pokeData;
    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedTypeFilter.length > 0) {
      for (let t of selectedTypeFilter) {
        list = list.filter((p) => p.type.includes(t.Name));
      }
    }
    if (selectedWeaknessFilter.length > 0) {
      for (let t of selectedWeaknessFilter) {
        list = list.filter((p) => p.weaknesses.includes(t.Name));
      }
    }
    return list;
  }, [pokeData, search, selectedTypeFilter, selectedWeaknessFilter]);
  return (
    <div>
      <p>Sam's Pokedex</p>
      <input
        onChange={(c) => {
          setSearch(c.currentTarget.value);
        }}
        placeholder="search"
      ></input>
      <div className="Filter">
        <text>Type filter: </text>
        <div className="Select">
          <Multiselect
            options={listOfTypes}
            onSelect={(
              selectedList: typeOption[],
              selectedItem: typeOption
            ) => {
              setSelectedTypeFilter([selectedItem, ...selectedList]);
            }}
            onRemove={(
              selectedList: typeOption[],
              selectedItem: typeOption
            ) => {
              setSelectedTypeFilter(
                selectedList.filter((i) => i.Name !== selectedItem.Name)
              );
            }}
            showCheckbox={true}
            displayValue="Name"
          />
        </div>
      </div>
      <div className="Filter">
        <text>Weakness filter: </text>
        <div className="Select">
          <Multiselect
            options={listOfTypes}
            onSelect={(
              selectedList: typeOption[],
              selectedItem: typeOption
            ) => {
              setSelectedWeaknessFilter([selectedItem, ...selectedList]);
            }}
            onRemove={(
              selectedList: typeOption[],
              selectedItem: typeOption
            ) => {
              setSelectedWeaknessFilter(
                selectedList.filter((i) => i.Name !== selectedItem.Name)
              );
            }}
            showCheckbox={true}
            displayValue="Name"
          />
        </div>
      </div>
      {displayPokemon.map((p) => (
        <ListItem poke={p} onClick={() => onPokePress(p)} />
      ))}
    </div>
  );
};

type listItemProps = { poke: Pokemon; onClick: () => void };
const ListItem = ({ poke, onClick }: listItemProps) => {
  return (
    <div onClick={onClick} className="ListItem">
      <div className="ListHeader">
        <text className="ItemName">
          <b>{poke.name}</b>{" "}
        </text>
        <text className="ItemNum">{poke.num}</text>
      </div>
      <div>
        <text>Type: {poke.type.join(", ")}</text>
      </div>
      <div>
        <text>Weaknesses: {poke.weaknesses.join(", ")}</text>
      </div>
    </div>
  );
};
