import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const EditDeplacementsScreen = ({ route }) => {
  // Récupérer les données de déplacement passées, ou utiliser un objet vide par défaut
  const deplacement = route.params?.deplacement || null;

  // Si aucun déplacement n'est passé, retourner un message d'erreur
  if (!deplacement) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun déplacement trouvé pour modification.</Text>
      </View>
    );
  }


  // État initial pour le formulaire
   const [userId, setUserId] = useState('');
   const [paysId, setPaysId] = useState('');
   const [paysId2, setPaysId2] = useState('');
   const [empreinteCO2, setEmpreinteCO2] = useState('');

  const getDeplacement = async () => {
    try {
      const response = await fetch(`${apiURL}/deplacement`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setTrajet(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error; 
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedDeplacement = {
        userId,
        paysId,
        paysId2,
        empreinteCO2,
      };
  
      const response = await fetch(`${apiURL}/deplacement/${deplacement.id}`, {
        method: 'PUT', // ou 'PATCH' en fonction de votre API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDeplacement),
      });
  
      if (response.ok) {
        // Vous pouvez traiter les données de réponse si nécessaire
  
        console.log('Déplacement mis à jour avec succès.');
        navigation.goBack(); // Retour à l'écran précédent après la mise à jour
      } else {
        console.error('Échec de la mise à jour du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du déplacement :', error);
    }
  };
  
  useEffect(() => {
    getDeplacement();
  }, []);

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
            value={userId}
            onChangeText={setUserId}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Pays de départ</Text>
          <TextInput
            style={styles.input}
            value={paysId}
            onChangeText={setPaysId}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Pays d'arrivée</Text>
          <TextInput
            style={styles.input}
            value={paysId}
            onChangeText={setPaysId2}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Empreinte CO2</Text>
          <TextInput
            style={styles.input}
            value={empreinteCO2}
            onChangeText={setEmpreinteCO2}
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
