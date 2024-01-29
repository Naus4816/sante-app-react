import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const EditDeplacementsScreen = ({ route, navigation }) => {
  const deplacementId = route.params?.deplacementId || null;

  if (!deplacementId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun déplacement trouvé pour modification.</Text>
      </View>
    );
  }

  // État initial pour le déplacement
  const [deplacement, setDeplacement] = useState({
    user_id: '',
    pays_id: '',
    pays_id2: '',
    empreinte_co2: ''
  });
  const ip = "192.168.1.36";
  const apiURL = `http://${ip}:8888/api`;

  const getDeplacement = async () => {
    try {
      const response = await fetch(`${apiURL}/deplacement/${deplacementId}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setDeplacement({
        user_id: data.user_id || '',
        pays_id: data.pays_id || '',
        pays_id2: data.pays_id2 || '',
        empreinte_co2: data.empreinte_co2 || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleInputChange = (name, value) => {
    setDeplacement(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${apiURL}/deplacement/${deplacementId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deplacement),
      });

      if (response.ok) {
        console.log('Déplacement mis à jour avec succès.');
        navigation.goBack();
      } else {
        console.error('Échec de la mise à jour du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du déplacement :', error);
    }
  };

  useEffect(() => {
    getDeplacement();
  }, [deplacementId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier le Déplacement</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.label}>Utilisateur ID</Text>
          <TextInput
            style={styles.input}
            placeholder={deplacement.user_id.toString()}
            onChangeText={(value) => handleInputChange('user_id', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Pays de départ</Text>
          <TextInput
            style={styles.input}
            placeholder={deplacement.pays_id.toString()}
            onChangeText={(value) => handleInputChange('pays_id', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Pays d'arrivée</Text>
          <TextInput
            style={styles.input}
            placeholder={deplacement.pays_id2.toString()}
            onChangeText={(value) => handleInputChange('pays_id2', value)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Empreinte CO2</Text>
          <TextInput
            style={styles.input}
            placeholder={deplacement.empreinte_co2.toString()}
            onChangeText={(value) => handleInputChange('empreinte_co2', value)}
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

export default EditDeplacementsScreen;
