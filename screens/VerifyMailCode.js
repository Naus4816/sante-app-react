import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { apiURL } from '@env';

const VerifyMailCode = ({route, navigation}) => {
  const initialEmail = route.params?.email || '';
  const [email, setEmail] = useState(initialEmail);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = async () => {
    try {
      const response = await fetch(`${apiURL}/login/resend-code`, {
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
        Alert.alert('Succès', 'Un code vous a été envoyé pour vérifier votre adresse mail. Veuillez vérifier votre boite mail.');
      }
    } catch (error) {
      // Gérer les erreurs de réseau / requête
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await fetch(`${apiURL}/login/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verification_code: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les erreurs venant de l'API
        Alert.alert('Erreur', data.message || 'Quelque chose a mal tourné');
      } else {
        // Code vérifié avec succès
        Alert.alert('Succès', 'Votre mail a été vérifié avec succès. Vous pouvez maintenant vous connectez.');
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Vérifier votre mail</Text>
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
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Code de vérification du mail"
            keyboardType="number-pad"
          />

          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>Vérifier le code</Text>
          </TouchableOpacity>
          <View style={styles.resendCode}>
            <TouchableOpacity onPress={handleSendCode}>
                <Text style={styles.resendCodeText}>Vous voulez recevoir un nouveau code? Cliquez ici</Text>
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
  resendCode: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendCodeText: {
    color: '#3490dc',
  },
});

export default VerifyMailCode;
