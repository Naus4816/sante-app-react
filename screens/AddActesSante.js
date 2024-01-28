import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddActeDeSanteScreen = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [paysId, setPaysId] = useState('');
  const [paysList, setPaysList] = useState([]); // Ajout de l'état pour les pays
  const apiURL = "http://172.20.10.2:8888/api";

  const getCountries = async () => {
    try {
      const response = await fetch(`${apiURL}/pays`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
  
      const data = await response.json();

      // Mettez à jour l'état avec la liste des noms de pays
      setPaysList(data);  
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
    }
  };

  const handleSave = async () => {
    try {
      const newActe = {
        nom,
        description,
        prix,
        pays_id: paysId,
      };

      const response = await fetch(`${apiURL}/actesante`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActe),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Vous pouvez traiter les données de réponse si nécessaire

        console.log('Acte de Santé ajouté avec succès.');
      } else {
        console.error('Échec de l\'ajout de l\'acte de Santé.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'acte de Santé :', error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Ajouter un Acte de Santé</Text>
        </View>
        <View style={styles.cardBody}>
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
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
          <Text style={styles.label}>Prix</Text>
          <TextInput
            style={styles.input}
            value={prix}
            onChangeText={setPrix}
            keyboardType="numeric"
            placeholder="Prix"
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
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Enregistrer</Text>
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

export default AddActeDeSanteScreen;