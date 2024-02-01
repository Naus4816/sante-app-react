import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { apiURL } from '@env';

const EditPaysScreen = ({ route, navigation }) => {
  const paysId = route.params?.paysId || null;

  if (!paysId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun pays trouvé pour modification.</Text>
      </View>
    );
  }

  // État initial pour le pays
  const [pays, setPays] = useState({
    nom: '',
    nom_anglais: ''
  });

  const getPays = async () => {
    try {
      const response = await fetch(`${apiURL}/paysid/${paysId}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setPays({
        nom: data.nom || '',
        nom_anglais: data.nom_anglais || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleInputChange = (name, value) => {
    setPays(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${apiURL}/pays/${paysId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pays),
      });

      if (response.ok) {
        console.log('Pays mis à jour avec succès.');
        navigation.goBack();
      } else {
        console.error('Échec de la mise à jour du pays.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du pays :', error);
    }
  };

  useEffect(() => {
    getPays();
  }, [paysId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier le Pays</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder={pays.nom.toString()}
            onChangeText={(value) => handleInputChange('nom', value)}
          />
          <Text style={styles.label}>Nom anglais</Text>
          <TextInput
            style={styles.input}
            placeholder={pays.nom_anglais.toString()}
            onChangeText={(value) => handleInputChange('nom_anglais', value)}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
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
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditPaysScreen;
