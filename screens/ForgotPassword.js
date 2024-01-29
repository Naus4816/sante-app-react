import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button,  StyleSheet, ScrollView } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const ip = "192.168.1.36";
  const apiURL = `http://${ip}:8888/api`;

  const handleForgotPassword = () => {
    // Ici, ajoutez votre logique pour la réinitialisation du mot de passe
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Réinitialisation du mot de passe</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.infoText}>
            Vous avez oublié votre mot de passe ? Pas de problème. 
            Indiquez-nous simplement votre adresse e-mail et nous vous enverrons un lien 
            de réinitialisation de mot de passe qui vous permettra de choisir un nouveau.
          </Text>
          {/* Affichez ici les erreurs de validation si nécessaire */}

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>
              Envoyer le lien de réinitialisation du mot de passe
            </Text>
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

export default ForgotPassword;