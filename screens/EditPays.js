import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const EditPaysScreen = ({ route }) => {
  // Supposons que vous recevez les données du pays via les paramètres de route
  const pays = route.params?.pays || null;
  const ip="10.7.16.102";

  // Si aucun pays n'est passé, retourner un message d'erreur
  if (!pays) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun pays trouvé pour modification.</Text>
      </View>
    );
  }

  const [nom, setNom] = useState(pays.nom);
  const [nom_anglais, setNom_Anglais] = useState(pays.nom_anglais);

  const getPays = async () => {
    try {
      const response = await fetch(`${apiURL}/pays`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setPays(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error; 
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPays = {
        nom,
        nom_anglais
      };
  
      const response = await fetch(`${apiURL}/pays/${pays.id}`, {
        method: 'PUT', // ou 'PATCH' en fonction de votre API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPays),
      });
  
      if (response.ok) {
        // Vous pouvez traiter les données de réponse si nécessaire
  
        console.log('Pays mis à jour avec succès.');
        navigation.goBack(); // Retour à l'écran précédent après la mise à jour
      } else {
        console.error('Échec de la mise à jour du pays.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du pays :', error);
    }
  };
  
  useEffect(() => {
    getPays();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier le Pays</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <Text style={styles.label}>Nom du Pays</Text>
          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Nom du pays"
          />
          <Text style={styles.label}>Indice CO2</Text>
          <TextInput
            style={styles.input}
            value={indiceCO2}
            onChangeText={setNom_Anglais}
            placeholder="Nom du pays en anglais"
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
    backgroundColor: '#f8f9fa',
    padding: 20,
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
