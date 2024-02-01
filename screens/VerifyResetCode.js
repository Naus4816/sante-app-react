import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { apiURL } from '@env';

const VerifyResetCode = ({route, navigation}) => {
  // Utilisation directe de la valeur du paramètre de route pour initialiser l'état de l'email
  const initialEmail = route.params?.email || '';
  const [email, setEmail] = useState(initialEmail);
  const [resetCode, setResetCode] = useState('');

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          reset_code: resetCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les erreurs venant de l'API
        Alert.alert('Erreur', data.message || 'Quelque chose a mal tourné');
      } else {
        // Code vérifié avec succès
        Alert.alert('Succès', 'Code de réinitialisation vérifié avec succès. Vous pouvez maintenant définir un nouveau mot de passe.');
        navigation.navigate('ResetPassword', { email: email });
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Vérifier le code de réinitialisation</Text>
        </View>
        <View style={styles.cardBody}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={resetCode}
            onChangeText={setResetCode}
            placeholder="Code de réinitialisation"
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Vérifier le code</Text>
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
});

export default VerifyResetCode;
