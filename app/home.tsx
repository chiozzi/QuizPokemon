import React, { useEffect, useState } from "react";
import axios from "axios";

// Interface para tipar o Pokémon
interface Pokemon {
  name: string;
  image: string;
}

export default function QuizPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Pokémon atual
  const [options, setOptions] = useState<string[]>([]);         // Alternativas
  const [loading, setLoading] = useState(true);                 // Estado de carregamento

  // Função que busca as alternativas erradas
  const fetchWrongOptions = async (correctName: string) => {
    let wrongNames = new Set<string>();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1; // 1ª geração
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }
    return Array.from(wrongNames);
  };

  // Função que carrega um novo Pokémon
  const loadPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 151) + 1; // pega id aleatório
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    const correctName = response.data.name;
    const id = response.data.id.toString().padStart(3, "0"); // garante 3 dígitos (001, 025, 150 etc.)
    const fullImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

    // monta objeto Pokémon
    const newPokemon: Pokemon = {
      name: correctName,
      image: fullImage,
    };

    setPokemon(newPokemon);

    // busca 3 opções erradas
    const wrongOptions = await fetchWrongOptions(correctName);

    // mistura as alternativas (correta + erradas)
    const allOptions = [...wrongOptions, correctName].sort(() => Math.random() - 0.5);

    setOptions(allOptions);
    setLoading(false);
  };

  // Carregar ao abrir a página
  useEffect(() => {
    loadPokemon();
  }, []);

  if (loading || !pokemon) return <h2>Carregando...</h2>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Quiz Pokémon</h1>
      <img src={pokemon.image} alt={pokemon.name} width={200} />
      <h2>Qual é esse Pokémon?</h2>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => alert(option === pokemon.name ? "✅ Acertou!" : "❌ Errou!")}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px 20px",
            backgroundColor: "gold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {option}
        </button>
      ))}

      <button onClick={loadPokemon} style={{ marginTop: "20px" }}>
        Próximo
      </button>
    </div>
  );
}
