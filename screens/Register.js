import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ip="10.7.16.102";
  const apiURL = `http://${ip}:8888/api`;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
    

      const data = await response.json();

      console.log(data);
      if (response.status === 201) {
        navigation.navigate('Login');
      } else {
        // Gérer les erreurs de l'API
        setErrorMessage(data.message || 'Erreur lors de l’inscription');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur réseau est survenue');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitle}>Rejoignez-nous</Text>
        </View>
        <View style={styles.cardBody}>
          {/* Ajoutez les valeurs et les gestionnaires d'événements pour les TextInput */}
          <TextInput
            style={styles.input}
            placeholder="Votre nom complet"
            autoCapitalize="words"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Créez un mot de passe"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmez votre mot de passe"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <View style={styles.alreadyRegistered}>
            <TouchableOpacity>
              <Text style={styles.alreadyRegisteredText}>
                Déjà inscrit ? Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
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
      backgroundColor: '#fff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    cardHeader: {
      backgroundColor: '#6AC8FF',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: 'center',
    },
    cardHeaderTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
    },
    cardBody: {
      padding: 20,
    },
    input: {
      backgroundColor: '#f8f9fa',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ced4da',
    },
    button: {
      backgroundColor: '#3490dc',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      marginBottom: 15,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    alreadyRegistered: {
      alignItems: 'center',
      marginTop: 10,
    },
    alreadyRegisteredText: {
      color: '#3490dc',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },  
  });

  export default RegisterScreen;