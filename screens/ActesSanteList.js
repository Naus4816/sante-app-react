import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActesSanteListScreen = () => {
  const navigation = useNavigation();
  const [healthActs, setHealthActs] = useState([]);
  const apiURL = "http://172.20.10.2:8888/api";

  const getActesSante = async () => {
    try {
      const response = await fetch(`${apiURL}/actesante`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setHealthActs(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error; 
    }
  };
    
  const navigateToAddActeSante = () => {
    navigation.navigate('AddActesSante'); 
  };
  const handleEdit = (id) => {
    navigation.navigate('EditActesSante', { acteSanteId: id });
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/actesante/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Supprimer l'acte de santé avec l'ID spécifié de l'état healthActs
        setHealthActs((prevHealthActs) => prevHealthActs.filter((acte) => acte.id !== id));
        console.log('Acte de Santé supprimé avec succès.');
      } else {
        console.error('Échec de la suppression de l\'acte de Santé.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'acte de Santé :', error);
    }
  };


  useEffect(() => {
    getActesSante();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Actes de Santé</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddActeSante}>
          <Text style={styles.addButtonText}>Ajouter un acte de santé</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {healthActs.map((acte) => (
          <View key={acte.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>{acte.nom}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Description: {acte.description}</Text>
              <Text>Prix: {acte.prix}€</Text>
              <Text>Pays: {acte.pays}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(acte.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(acte.id)}>
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
    flexDirection: 'row', // Permet d'aligner le titre et le bouton sur la même ligne
    justifyContent: 'space-between', // Répartit uniformément l'espace
    alignItems: 'center', // Alignement vertical des éléments
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
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

export default ActesSanteListScreen;
