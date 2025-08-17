  import { Stack } from 'expo-router';

  export default function RootLayout() {
    return (
      <Stack>
        <Stack.Screen name="index" options={{
          title: "Index",
        }} />
        <Stack.Screen name="about" options={{
          title: "Sobre",        
        }} />
        <Stack.Screen name="home" options={{
          title: "Quiz Pokémon",        
        }} />

      

        
      </Stack>
      


    );
  }