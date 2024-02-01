import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiURL } from '@env';

const DeplacementsListScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [deplacements, setDeplacements] = useState([]);

  const getDeplacements = async () => {
    try {
      const response = await fetch(`${apiURL}/deplacement`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setDeplacements(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de déplacement :', error);
      throw error;
    }
  };

  const navigateToAddDeplacement = () => {
    navigation.navigate('AddDeplacements');
  };

  const handleEdit = (id) => {
    navigation.navigate('EditDeplacements', { deplacementId: id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/deplacement/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Supprimer le déplacement avec l'ID spécifié de l'état deplacements
        setDeplacements((prevDeplacements) => prevDeplacements.filter((deplacement) => deplacement.id !== id));
        console.log('Déplacement supprimé avec succès.');
      } else {
        console.error('Échec de la suppression du déplacement.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du déplacement :', error);
    }
  };  

  const isSmallDevice = windowWidth < 768;

  useFocusEffect(
    useCallback(() => {
      getDeplacements();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, isSmallDevice && styles.smallHeader]}>
        <Text style={[styles.headerText, isSmallDevice && styles.smallHeaderText]}>Liste des Déplacements</Text>
        <TouchableOpacity style={[styles.addButton, isSmallDevice && styles.smallAddButton]} onPress={navigateToAddDeplacement}>
          <Text style={[styles.addButtonText, isSmallDevice && styles.smallAddButtonText]}>Ajouter un déplacement</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {deplacements.map((deplacement) => (
          <View key={deplacement.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Déplacement ID: {deplacement.id}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Utilisateur ID: {deplacement.user_id}</Text>
              <Text>Pays ID: {deplacement.pays_id}</Text>
              <Text>Pays ID 2: {deplacement.pays_id2}</Text>
              <Text>Empreinte CO2: {deplacement.empreinte_co2}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(deplacement.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(deplacement.id)}>
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

export default DeplacementsListScreen;
