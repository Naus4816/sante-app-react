import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, } from 'react-native';
import { apiURL } from '@env';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = async () => {
    try {
      const response = await fetch(`${apiURL}/password/send-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les erreurs venant de l'API
        Alert.alert('Erreur', data.message || 'Quelque chose a mal tourné');
      } else {
        // Afficher un message de succès
        Alert.alert('Succès', 'Le code a bien été envoyé. Veuillez vérifier votre boite mail.');
        navigation.navigate('VerifyResetCode', {email:email} );
      }
    } catch (error) {
      // Gérer les erreurs de réseau / requête
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
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
            Indiquez-nous simplement votre adresse e-mail et nous vous enverrons un code 
            de réinitialisation de mot de passe qui vous permettra d'en choisir un nouveau.
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>
              Envoyer le lien de réinitialisation du mot de passe
            </Text>
          </TouchableOpacity>
            <View style={styles.resetPassword}>
              <TouchableOpacity onPress={() => navigation.navigate('VerifyResetCode')}>
                <Text style={styles.resetPasswordText}>
                  Vous avez déjà reçu un code ? Cliquez ici
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
  },
  resetPassword: {
    alignItems: 'center',
    marginTop: 10,
  },
  resetPasswordText: {
    color: '#3490dc',
  }
});

export default ForgotPassword;
