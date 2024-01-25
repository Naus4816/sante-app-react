import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const EmailVerificationScreen = () => {
  
  const resendVerificationEmail = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken'); // Remplacez par votre méthode d'authentification
        const response = await fetch('http://192.168.1.36:8888/api/email/resend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            // Afficher un message de succès
        } else {
            // Gérer les erreurs
        }
    } catch (error) {
        // Gérer les erreurs de réseau
    }
  } 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Vérification de l'E-mail</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardBodyText}>
            Merci de vous être inscrit ! Avant de commencer, pourriez-vous vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer par e-mail ? Si vous n'avez pas reçu l'e-mail, nous vous en enverrons volontiers un autre.
          </Text>
          {/* Afficher le message de statut ici */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonPrimary} onPress={resendVerificationEmail}>
              <Text style={styles.buttonText}>Renvoyer l'E-mail de Vérification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogout}>
              <Text style={styles.buttonText}>Se Déconnecter</Text>
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
    cardBodyText: {
        color: '#333',
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        flexWrap: 'wrap', // Permet aux boutons de passer à la ligne suivante si nécessaire
    },
    buttonPrimary: {
        backgroundColor: '#3490dc',
        borderRadius: 20,
        padding: 15,
        flex: 1, // Prend la moitié de l'espace disponible
        margin: 5, // Petite marge pour éviter les chevauchements
    },
    buttonLogout: {
        backgroundColor: '#dc3545',
        borderRadius: 20,
        padding: 15,
        flex: 1, // Prend la moitié de l'espace disponible
        margin: 5, // Petite marge pour éviter les chevauchements
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    }
});

export default EmailVerificationScreen;