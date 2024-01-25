import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ConfirmPasswordScreen = () => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Ici, ajoutez votre logique pour la confirmation du mot de passe
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Confirmation de mot de passe</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.infoText}>
            C'est une zone sécurisée de l'application. Veuillez confirmer votre mot de passe avant de continuer.
          </Text>
          {/* Affichez ici les erreurs de validation si nécessaire */}
          
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: 20,
  },
  cardHeaderText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardBody: {
    backgroundColor: '#fff',
    padding: 40,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3490dc',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default ConfirmPasswordScreen;