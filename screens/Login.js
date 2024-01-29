import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ userId,setUserId ] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const ip = "192.168.1.36";
  const apiURL = `http://${ip}:8888/api`;

  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userId', userId.toString());
      const storedUserId = await AsyncStorage.getItem('userId');
    } catch (error) {
      console.error('Erreur lors du stockage de l\'ID de l\'utilisateur:', error);
    }
  };
    
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      
      if (response.status === 200) {
        // Vérifier si l'utilisateur est un administrateur
        if (data.is_admin) {
          // Naviguer vers le tableau de bord administrateur
          navigation.navigate('AdminDashboard');
        } else {
          // Naviguer vers le tableau de bord utilisateur standard
          storeUserId(data.id);
          navigation.navigate('UserDashboard');
        }
      } else {
        // Si le statut n'est pas 200, on suppose qu'il y a une erreur de connexion
        setErrorMessage(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      // Cette partie attrape les erreurs de réseau ou les erreurs survenues lors de la requête
      setErrorMessage(error.message || 'Une erreur est survenue lors de la connexion');
    }
  };
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.loginInfo}>
          {/* ... contenu de loginInfo ... */}
        </View>
  
        <View style={styles.loginForm}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Connectez-vous à votre compte</Text>
            </View>
  
            <View style={styles.cardBody}>
              {/* Affichage du message d'erreur */}
              {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
  
              {/* Champs de saisie Email et Mot de passe */}
              <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Mot de passe"
                secureTextEntry
              />
  
              {/* Bouton de connexion */}
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
              </TouchableOpacity>
            </View>
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
    padding: 10, // Réduction du padding pour les petits écrans
  },loginContainer: {
    flexDirection: 'column', // Utilisation d'un stack layout sur mobile
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInfo: {
    margin: 10, // Réduction de la marge
    flex: 1,
    alignItems: 'center', // Centrage du texte sur mobile
  },
  loginInfoTitle: {
    fontSize: 20, // Réduction de la taille de la police pour les petits écrans
    fontWeight: 'bold',
    marginBottom: 10, // Réduction de l'espacement
  },
  loginInfoText: {
    fontSize: 14, // Taille de police adaptée pour mobile
    marginBottom: 10,
    textAlign: 'center', // Centrage du texte sur mobile
  },
  linkText: {
    color: '#3490dc',
    textDecorationLine: 'underline',
  },
  loginForm: {
    flex: 1,
    width: '100%',
  },
  card: {
    borderRadius: 15, // Réduction du rayon de bordure pour un look plus adapté au mobile
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    margin: 10, // Ajout d'une marge autour de la carte
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: 15, // Réduction du padding
  },
  cardHeaderText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18, // Réduction de la taille de la police pour les petits écrans
  },
  cardBody: {
    backgroundColor: '#fff',
    padding: 20, // Réduction du padding pour les petits écrans
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    padding: 12, // Réduction du padding
    marginBottom: 15,
    fontSize: 14, // Réduction de la taille de la police
  },
  button: {
    backgroundColor: '#3490dc',
    borderRadius: 20,
    padding: 12, // Réduction du padding
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14, // Réduction de la taille de la police
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  }
});

export default LoginScreen;