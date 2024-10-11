import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter pokemons based on search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
        {filteredPokemons.map((pokemon, index) => (
          <div className="pokemon-card" key={index}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;