import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const users = [
  { id: 1, name: 'User 1', email: 'user1@example.com' },
  { id: 2, name: 'User 2', email: 'user2@example.com' },
  // Ajoutez d'autres utilisateurs ici
];

const UserListScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
    const navigateToAddUser = () => {
      navigation.navigate('AddUser'); // Assurez-vous que 'AddUser' est le nom correct de l'écran dans votre Navigator
    };
    
  const navigateToEditUser = (user) => {
    navigation.navigate('EditUser', { user }); // Passer l'utilisateur en tant que paramètre
  };
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Utilisateurs</Text>
          <TouchableOpacity style={styles.addButton} onPress={navigateToAddUser}>
            <Text style={styles.addButtonText}>Ajouter un utilisateur</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {users.map(user => (
            <View key={user.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>Nom: {user.name}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text>Email: {user.email}</Text>
                <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigateToEditUser(user)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]}>
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
  
  export default UserListScreen;