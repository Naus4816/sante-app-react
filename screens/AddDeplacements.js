import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AddDeplacementsScreen = () => {
  const [userId, setUserId] = useState('');
  const [paysId, setPaysId] = useState('');
  const [paysId2, setPaysId2] = useState('');
  const [empreinteCO2, setEmpreinteCO2] = useState('');

  const handleSave = async () => {
    try {
      const newDeplacement = {
        userId,
        paysId,
        paysId2,
        empreinteCO2,
      };
  
      const response = await fetch(`${apiURL}/deplacement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDeplacement),
      });
  
      if (response.ok) {
        // Vous pouvez traiter les données de réponse si nécessaire
  
        console.log('Déplacement ajouté avec succès.');
      } else {
        console.error('Échec de l\'ajout du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du déplacement :', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ajouter un Nouveau Déplacement</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Utilisateur ID</Text>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              keyboardType="numeric"
              placeholder="ID de l'utilisateur"
            />
            <Text style={styles.label}>Pays de départ</Text>
            <TextInput
              style={styles.input}
              value={paysId}
              onChangeText={setPaysId}
              keyboardType="numeric"
              placeholder="ID du pays"
            />
            <Text style={styles.label}>Pays d'arrivée</Text>
            <TextInput
              style={styles.input}
              value={paysId}
              onChangeText={setPaysId2}
              keyboardType="numeric"
              placeholder="ID du pays"
            />
            <Text style={styles.label}>Empreinte CO2</Text>
            <TextInput
              style={styles.input}
              value={empreinteCO2}
              onChangeText={setEmpreinteCO2}
              keyboardType="numeric"
              placeholder="Empreinte CO2"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Enregistrer</Text>
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
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#6AC8FF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100, // Hauteur ajustée pour la zone de texte
  },
  button: {
    backgroundColor: '#3490dc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddDeplacementsScreen;
