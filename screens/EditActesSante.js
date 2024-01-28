import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const EditActesSanteScreen = ({ route }) => {
  const navigation = useNavigation();
  const { acteSanteId } = route.params; // Assurez-vous de passer 'acteSanteId' lors de la navigation vers cet écran

  // État initial pour le formulaire
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [paysId, setPaysId] = useState('');

  const getActesSante = async () => {
    try {
      const response = await fetch(`${apiURL}/actesante`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setHealthActs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error; 
    }
  };

  useEffect(() => {
    getActesSante();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedActe = {
        nom: nom, // Mettez à jour avec la nouvelle valeur
        description: description, // Mettez à jour avec la nouvelle valeur
        prix: prix, // Mettez à jour avec la nouvelle valeur
        pays_id: paysId, // Mettez à jour avec la nouvelle valeur
      };
  
      const response = await fetch(`${apiURL}/actesante/${acteSanteId}`, {
        method: 'PUT', // ou 'PATCH' en fonction de votre API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActe),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        // Vous pouvez traiter les données de réponse si nécessaire
  
        console.log('Acte de Santé mis à jour avec succès.');
        navigation.goBack(); // Retour à l'écran précédent après la mise à jour
      } else {
        console.error('Échec de la mise à jour de l\'acte de Santé.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'acte de Santé :', error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier l'Acte de Santé</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Nom de l'acte de santé"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Description de l'acte de santé"
          multiline
        />
        <Text style={styles.label}>Prix</Text>
        <TextInput
          style={styles.input}
          value={prix.toString()}
          onChangeText={(text) => setPrix(text)}
          placeholder="Prix de l'acte de santé"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Pays</Text>
        <Picker
          selectedValue={paysId}
          onValueChange={(itemValue) => setPaysId(itemValue)}
          style={styles.picker}
        >
          {paysList.map((pays) => (
            <Picker.Item key={pays.id} label={pays.nom} value={pays.id} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
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
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    minHeight: 100, // Ajustez selon besoin pour la description
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginBottom: 15,
    // Autres styles pour le picker si nécessaire
  },
  button: {
    backgroundColor: '#3490dc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditActesSanteScreen;
