import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { apiURL } from '@env';

const RecommandationsListScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [recommandations, setRecommandations] = useState([]);

  const getRecommandations = async () => {
    try {
      const response = await fetch(`${apiURL}/recommandations`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setRecommandations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de recommandation :', error);
      throw error;
    }
  };

  const navigateToAddRecommandation = () => {
    navigation.navigate('AddRecommandation');
  };

  const handleEdit = (id) => {
    navigation.navigate('EditRecommandation', { recommandationId: id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/recommandations/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Supprimer la recommandation avec l'ID spécifié de l'état recommandations
        setRecommandations((prevRecommandations) => prevRecommandations.filter((recommandation) => recommandation.id !== id));
        console.log('Recommandation supprimé avec succès.');
      } else {
        console.error('Échec de la suppression du recommandation.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du recommandation :', error);
    }
  };  

  const isSmallDevice = windowWidth < 768;

  useFocusEffect(
    useCallback(() => {
      getRecommandations();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, isSmallDevice && styles.smallHeader]}>
        <Text style={[styles.headerText, isSmallDevice && styles.smallHeaderText]}>Liste des Recommandations</Text>
        <TouchableOpacity style={[styles.addButton, isSmallDevice && styles.smallAddButton]} onPress={navigateToAddRecommandation}>
          <Text style={[styles.addButtonText, isSmallDevice && styles.smallAddButtonText]}>Ajouter une recommandation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {recommandations.map((recommandation) => (
          <View key={recommandation.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Recommandation ID: {recommandation.id}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Contenu: {recommandation.contenu}</Text>
              <Text>Pays ID: {recommandation.pays_id}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(recommandation.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(recommandation.id)}>
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

export default RecommandationsListScreen;
