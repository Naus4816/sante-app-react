import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const UsersListScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const [users, setUsers] = useState([]);
  const ip = "192.168.1.36";
  const apiURL = `http://${ip}:8888/api`;

  const getUsers = async () => {
    try {
      const response = await fetch(`${apiURL}/user`); 
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des utilisateurs :', error);
      throw error;
    }
  };

  const navigateToAddUser = () => {
    navigation.navigate('AddUser');
  };

  const handleEdit = (id) => {
    navigation.navigate('EditUser', { userId: id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiURL}/user/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Supprimer l'utilisateur avec l'ID spécifié de l'état users
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log('Utilisateur supprimé avec succès.');
      } else {
        console.error('Échec de la suppression de l/utilisateur.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l/utilisateur :', error);
    }
  };  

  const isSmallDevice = windowWidth < 768;

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, isSmallDevice && styles.smallHeader]}>
        <Text style={[styles.headerText, isSmallDevice && styles.smallHeaderText]}>Liste des utilisateurs</Text>
        <TouchableOpacity style={[styles.addButton, isSmallDevice && styles.smallAddButton]} onPress={navigateToAddUser}>
          <Text style={[styles.addButtonText, isSmallDevice && styles.smallAddButtonText]}>Ajouter un utilisateur</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Utilisateur ID: {user.id}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Nom: {user.name}</Text>
              <Text>Email: {user.email}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(user.id)}>
                  <Text style={styles.actionButtonText}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonDanger]} onPress={() => handleDelete(user.id)}>
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

export default UsersListScreen;
