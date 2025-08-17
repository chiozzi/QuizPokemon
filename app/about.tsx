import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image
        style={styles.imagem}
        source={require("../assets/images/pokebola.png")}
      />

      {/* Título e subtítulo */}
      <Text style={styles.titulo}>Pokémon Quiz</Text>
      <Text style={styles.subtitulo}>Explorando o universo dos jogos!</Text>

      {/* Versão */}
      <View style={styles.textos}>
        <Ionicons name="game-controller" size={20} color="#FFD700" />
        <Text style={styles.texto}> Versão: 1.0.0</Text>
      </View>

      {/* Desenvolvedor */}
      <View style={styles.textos}>
        <MaterialIcons name="group" size={20} color="#FFD700" />
        <Text style={styles.texto}> Desenvolvido por: Game Dev Team</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252325",
    padding: 20,
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 20,
  },
  titulo: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    color: "#a1a0a0",
  },
  textos: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  texto: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
  },
});
