import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaysListScreen = () => {
  const navigation = useNavigation();
  const [pays, setPays] = useState([]);
  const ip="10.7.16.102";
  const apiURL = `http://${ip}:8888/api`;

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
  
  const navigateToAddPays = () => {
    navigation.navigate('AddPays'); // Assurez-vous que 'AddPays' est bien défini dans votre stack navigator
  };

  const handleEdit = (id) => {
    navigation.navigate('EditPays', { paysId: id }); // Assurez-vous que 'EditPays' est bien défini dans votre stack navigator
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/pays/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Supprimer l'acte de santé avec l'ID spécifié de l'état healthActs
        setPays((prevPays) => prevPays.filter((pays) => pays.id !== id));
        console.log('Acte de Santé supprimé avec succès.');
      } else {
        console.error('Échec de la suppression de l\'acte de Santé.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'acte de Santé :', error);
    }
  };
  
  useEffect(() => {
    getPays();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pays</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddPays}>
          <Text style={styles.addButtonText}>Ajouter un Pays</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {pays.map(pay => (
          <View key={pay.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>{pay.nom}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Indice CO2: {pay.indiceCO2}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(pay.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(pay.id)}>
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

export default PaysListScreen;
