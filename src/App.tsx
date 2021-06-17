import React from "react";
import "./App.css";
import { PokeList } from "./components/PokeList";
import { PokeDetail } from "./components/PokeDetail";
import { usePokemon } from "./usePokemon";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const { pokemon } = usePokemon();
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/pokemonDetail/:num">
            <PokeDetail pokemons={pokemon} />
          </Route>
          <Route path="/">
            <PokeList pokeData={pokemon} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
