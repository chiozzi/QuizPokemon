import React, { useEffect, useState } from "react";
import axios from "axios";

// Tipagem do Pokémon
interface Pokemon {
  name: string;
  image: string;
}

export default function QuizPokemon() {
  // Estados
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); // Pokémon atual
  const [options, setOptions] = useState<string[]>([]);         // Alternativas
  const [loading, setLoading] = useState(true);                 // Carregamento
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Mensagem do alerta customizado

  // Busca 3 nomes errados diferentes
  const fetchWrongOptions = async (correctName: string) => {
    let wrongNames = new Set<string>();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }
    return Array.from(wrongNames);
  };

  // Carrega um novo Pokémon aleatório
  const loadPokemon = async () => {
    setLoading(true);
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );

    // Nome e imagem
    const correctName = response.data.name;
    const id = response.data.id.toString().padStart(3, "0");
    const fullImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

    // Cria objeto Pokémon
    const newPokemon: Pokemon = { name: correctName, image: fullImage };
    setPokemon(newPokemon);

    // Busca alternativas erradas
    const wrongOptions = await fetchWrongOptions(correctName);

    // Junta todas e embaralha
    const allOptions = [...wrongOptions, correctName].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setLoading(false);
    setAlertMessage(null); // esconde alerta anterior
  };

  // Executa 1x quando o componente monta
  useEffect(() => {
    loadPokemon();
  }, []);

  if (loading || !pokemon) return <h2>Carregando...</h2>;

  return (
    <div style={styles.container}>
      <h1>Quiz Pokémon</h1>
      <img src={pokemon.image} alt={pokemon.name} width={200} />
      <h2>Qual é esse Pokémon?</h2>

      {/* Botões de resposta */}
      {options.map((option) => (
        <button
          key={option}
          onClick={() =>
            setAlertMessage(
              option === pokemon.name ? "✅ Acertou!" : "❌ Errou!"
            )
          }
          style={styles.optionButton}
        >
          {option}
        </button>
      ))}

      {/* Botão para novo Pokémon */}
      <button onClick={loadPokemon} style={styles.nextButton}>
        Próximo
      </button>

      {/* Alerta customizado (modal bonitinho) */}
      {alertMessage && (
        <div style={styles.alertOverlay}>
          <div style={styles.alertBox}>
            <p>{alertMessage}</p>
            <button onClick={() => setAlertMessage(null)} style={styles.closeBtn}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos centralizados em "const styles"
const styles: { [key: string]: React.CSSProperties } = {
  container: { textAlign: "center", fontFamily: "Arial, sans-serif" },
  optionButton: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    backgroundColor: "gold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  alertOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  alertBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    minWidth: "250px",
  },
  closeBtn: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
