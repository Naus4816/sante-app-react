import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { apiURL } from '@env';

const EditActeSantesScreen = ({ route, navigation }) => {
  const acteSanteId = route.params?.acteSanteId || null;
  if (!acteSanteId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun acte de santé trouvé pour modification.</Text>
      </View>
    );
  }

  // État initial pour le déplacement
  const [actesante, setActeSante] = useState({
    nom: '',
    description: '',
    prix: '',
    pays_id: ''
  });

  const getActeSante = async () => {
    try {
      const response = await fetch(`${apiURL}/actesantes/${acteSanteId}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setActeSante({
        nom: data.nom || '',
        description: data.description || '',
        prix: data.prix || '',
        pays_id: data.pays_id || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleInputChange = (name, value) => {
    setActeSante(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${apiURL}/actesante/${acteSanteId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actesante),
      });

      if (response.ok) {
        console.log('Acte de santé mis à jour avec succès.');
        navigation.goBack();
      } else {
        console.error('Échec de la mise à jour de l\acte de santé.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\acte de santé :', error);
    }
  };

  useEffect(() => {
    getActeSante();
  }, [acteSanteId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier l'acte de santé</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder={actesante.nom.toString()}
            onChangeText={(value) => handleInputChange('nom', value)}
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder={actesante.description.toString()}
            onChangeText={(value) => handleInputChange('description', value)}
          />
          <Text style={styles.label}>Prix</Text>
          <TextInput
            style={styles.input}
            placeholder={actesante.prix.toString()}
            onChangeText={(value) => handleInputChange('prix', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Pays Id</Text>
          <TextInput
            style={styles.input}
            placeholder={actesante.pays_id.toString()}
            onChangeText={(value) => handleInputChange('pays_id', value)}
            keyboardType="numeric"
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

export default EditActeSantesScreen;
