import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const recommandations = [
  { id: 1, pays_id: 'Pays_Id', contenu: 'Contenu Recommandation 1' },
  // ... autres recommandations
];

const RecommandationListScreen = () => {
  const navigation = useNavigation();

  const navigateToAddRecommandation = () => {
    navigation.navigate('AddRecommandation');
  };

  const handleEdit = (id) => {
    navigation.navigate('EditRecommandation', { recommandationId: id });
  };

  const handleDelete = (id) => {
    console.log(`Supprimer la recommandation avec l'id: ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommandations</Text>
        <TouchableOpacity style={styles.addButton} onPress={navigateToAddRecommandation}>
          <Text style={styles.addButtonText}>Ajouter une recommandation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {recommandations.map(recommandation => (
          <View key={recommandation.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>{recommandation.titre}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>{recommandation.contenu}</Text>
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
    flexWrap: 'wrap', // Permet au contenu de l'en-tête de passer à la ligne suivante si nécessaire
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Permet au texte de s'adapter à l'espace disponible
    marginRight: 10, // Assure un espace entre le texte et le bouton
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start', // Alignement du bouton en haut
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

export default RecommandationListScreen;
