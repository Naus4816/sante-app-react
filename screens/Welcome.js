import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.jumbotron}>
        <Text style={styles.header}>Bienvenue sur Sante-App!</Text>
        <Text style={styles.subheader}>Votre guide global pour le coût des soins de santé et le tourisme médical.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>En savoir plus</Text>
        </TouchableOpacity>
      </View>

      {/* Autres sections ici */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  jumbotron: {
    margin: 20,
    padding: 20,
    backgroundColor: '#6AC8FF',
    borderRadius: 12,
  },
  header: {
    fontSize: 24,
    color: '#fff',
  },
  subheader: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3A8DFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  // Ajoutez d'autres styles ici
});

export default App;
