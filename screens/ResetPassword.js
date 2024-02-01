import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { apiURL } from '@env';

const ResetPasswordScreen = ({ route, navigation }) => {
  const email = route.params?.email || null;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    
    try {
      // Envoi de la requête à l'API
      const response = await fetch(`${apiURL}/password/new-password`, {
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
  
      if (!response.ok) {
        // Gérer les erreurs venant de l'API
        alert(data.message || 'Quelque chose a mal tourné');
      } else {
        // Mot de passe mis à jour avec succès
        alert('Mot de passe mis à jour avec succès.');
        // Vous pouvez ici rediriger l'utilisateur vers l'écran de connexion
        navigation.navigate('Login');
      }
    } catch (error) {
      // Gérer les erreurs de réseau / requête
      alert("Impossible de se connecter au serveur");
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Réinitialisation du Mot de Passe</Text>
        </View>
        <View style={styles.cardBody}>
          {/* Formulaire */}
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Nouveau mot de passe"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirmer le nouveau mot de passe"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
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

export default ResetPasswordScreen;