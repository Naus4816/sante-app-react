import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { apiURL } from '@env';

const AddRecommandationScreen = ({navigation}) => {
  const [contenu, setContenu] = useState('');
  const [pays_id, setPaysId] = useState('');

  const handleSave = async () => {
    try {
      const newRecommendation = {
        contenu,
        pays_id,
      };
  
      const response = await fetch(`${apiURL}/recommandations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecommendation),
      });
  
      if (response.ok) {
        navigation.goBack();
        console.log('Recommandation ajoutée avec succès.');
      } else {
        console.error('Échec de l\'ajout de la recommandation.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recommandation :', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ajouter une nouvelle recommandation</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contenu</Text>
            <TextInput
              style={styles.input}
              value={contenu}
              onChangeText={setContenu}
              placeholder="Contenu"
            />
            <Text style={styles.label}>Pays recommandé</Text>
            <TextInput
              style={styles.input}
              value={pays_id}
              onChangeText={setPaysId}
              placeholder="ID du pays"
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

export default AddRecommandationScreen;
