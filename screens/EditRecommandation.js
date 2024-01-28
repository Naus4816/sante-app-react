import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditRecommandationScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  // Remplacez ces valeurs par celles récupérées de votre backend ou API
  const [titre, setTitre] = useState('Titre initial');
  const [contenu, setContenu] = useState('Contenu initial');

  const handleUpdate = () => {
    console.log('Mettre à jour la recommandation');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Modifier la Recommandation</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Titre</Text>
        <TextInput
          style={styles.input}
          value={titre}
          onChangeText={setTitre}
          placeholder="Titre de la recommandation"
        />
        <Text style={styles.label}>Contenu</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={contenu}
          onChangeText={setContenu}
          placeholder="Contenu de la recommandation"
          multiline
        />
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
    minHeight: 100,
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

export default EditRecommandationScreen;
