import React, { useState } from "react";

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  title: { color: "#FF0000" },
  input: { padding: "10px", fontSize: "16px", marginRight: "10px" },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    background: "#FFCC00",
    border: "none",
    cursor: "pointer",
  },
  pokemonCard: {
    marginTop: "20px",
    width: "300px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
  pokemonImage: {
    width: "120px",
    height: "120px",
  },
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("");

  const fetchPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();

      const heightInFeet = (data.height / 10) * 3.28084; // Convert meters to feet
      const weightInPounds = (data.weight / 10) * 2.20462; // Convert kilograms to pounds

      setPokemon({
        name: data.name,
        image: data.sprites?.other["official-artwork"]?.front_default || data.sprites?.front_default,
        type: data.types.map((t) => t.type.name).join(", "),
        height: heightInFeet.toFixed(2), // Round to 2 decimal places
        weight: weightInPounds.toFixed(2), // Round to 2 decimal places
      });
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemon(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokédex</h1>
      <input
        type="text"
        placeholder="Enter Pokémon name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
      <button onClick={fetchPokemon} style={styles.button}>
        Search
      </button>

      {pokemon && (
        <div style={styles.pokemonCard}>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={styles.pokemonImage}
          />
          <p>Type: {pokemon.type}</p>
          <p>Height: {pokemon.height} ft</p>
          <p>Weight: {pokemon.weight} lbs</p>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
