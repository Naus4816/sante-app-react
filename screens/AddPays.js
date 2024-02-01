import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { apiURL } from '@env';

const AddPaysScreen = ({navigation}) => {
  const [nom, setNom] = useState('');
  const [nom_anglais, setNomAnglais] = useState('');

  const handleSave = async () => {
    try {
      const newPays = {
        nom,
        nom_anglais
      };
  
      const response = await fetch(`${apiURL}/pays`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPays),
      });
  
      if (response.ok) {
        navigation.goBack();
        console.log('Pays ajouté avec succès.');
      } else {
        console.error('Échec de l\'ajout du pays.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du pays :', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ajouter un Nouveau Pays</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={nom}
              onChangeText={setNom}
              placeholder="Nom du pays"
            />
            <Text style={styles.label}>Nom en anglais</Text>
            <TextInput
              style={styles.input}
              value={nom_anglais}
              onChangeText={setNomAnglais}
              placeholder="Nom du pays en anglais"
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

export default AddPaysScreen;
