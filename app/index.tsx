import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokémon Quiz</Text>

      <View style={styles.containerbotoes}>
        {/* Botão para a tela Sobre */}
        <Link href="/about" asChild>
          <Pressable style={styles.botao}>
            <Text style={styles.textoBotao}>Ir para a tela Sobre</Text>
          </Pressable>
        </Link>

        {/* Botão para a tela Quiz */}
        <Link href="/home" asChild>
          <Pressable style={styles.botao}>
            <Text style={styles.textoBotao}>Ir para o Quiz</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252325ff",
  },
  titulo: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    paddingBottom: 15,
    color: "#ffffffff",
  },
  containerbotoes: {
    gap: 20,
  },
  botao: {
    backgroundColor: "#fbff00ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#000000ff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
