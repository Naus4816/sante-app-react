import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiURL } from '@env';

const PaysListScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [pays, setPays] = useState([]);

  const getPays = async () => {
    try {
      const response = await fetch(`${apiURL}/pays`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setPays(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de pays :', error);
      throw error;
    }
  };

  const navigateToAddPays = () => {
    navigation.navigate('AddPays');
  };

  const handleEdit = (id) => {
    navigation.navigate('EditPays', { paysId: id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/pays/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Supprimer le pays avec l'ID spécifié de l'état pays
        setPays((prevPays) => prevPays.filter((pays) => pays.id !== id));
        console.log('Pays supprimé avec succès.');
      } else {
        console.error('Échec de la suppression du pays.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du pays :', error);
    }
  };  

  const isSmallDevice = windowWidth < 768;

  useFocusEffect(
    useCallback(() => {
      getPays();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, isSmallDevice && styles.smallHeader]}>
        <Text style={[styles.headerText, isSmallDevice && styles.smallHeaderText]}>Liste des pays</Text>
        <TouchableOpacity style={[styles.addButton, isSmallDevice && styles.smallAddButton]} onPress={navigateToAddPays}>
          <Text style={[styles.addButtonText, isSmallDevice && styles.smallAddButtonText]}>Ajouter un pays</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {pays.map((pays) => (
          <View key={pays.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Pays ID: {pays.id}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Nom: {pays.nom}</Text>
              <Text>Nom anglais: {pays.nom_anglais}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(pays.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(pays.id)}>
                  <Text style={styles.actionButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  smallHeaderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  smallAddButton: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  smallAddButtonText: {
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
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
  },
  cardBody: {
    padding: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#3490dc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  actionButtonText: {
    color: 'white',
  },
  actionButtonDanger: {
    backgroundColor: '#dc3545',
  },
});

export default PaysListScreen;
