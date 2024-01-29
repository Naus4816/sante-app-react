import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const EditRecommandationsScreen = ({ route, navigation }) => {
  const recommandationId = route.params?.recommandationId || null;

  if (!recommandationId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun pays trouvé pour modification.</Text>
      </View>
    );
  }

  // État initial pour la recommandation
  const [recommandation, setRecommandation] = useState({
    contenu: '',
    pays_id: ''
    });
  const ip = "192.168.1.36";
  const apiURL = `http://${ip}:8888/api`;

  const getRecommandation = async () => {
    try {
      const response = await fetch(`${apiURL}/recommandation/${recommandationId}`);
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setRecommandation({
        contenu: data.contenu || '',
        pays_id: data.pays_id || '',
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };

  const handleInputChange = (name, value) => {
    setRecommandation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${apiURL}/recommandations/${recommandationId}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recommandation),
      });

      if (response.ok) {
        console.log('Recommandation mis à jour avec succès.');
        navigation.goBack();
      } else {
        console.error('Échec de la mise à jour du recommandation.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du recommandation :', error);
    }
  };

  useEffect(() => {
    getRecommandation();
  }, [recommandationId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier la Recommandation</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.label}>Contenu</Text>
          <TextInput
            style={styles.input}
            placeholder={recommandation.contenu.toString()}
            onChangeText={(value) => handleInputChange('contenu', value)}
          />
          <Text style={styles.label}>Pays ID</Text>
          <TextInput
            style={styles.input}
            placeholder={recommandation.pays_id.toString()}
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

export default EditRecommandationsScreen;
