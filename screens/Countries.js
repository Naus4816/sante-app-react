import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';

const CountriesScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const navigate = (route) => {
    console.log(`Navigating to ${route}`);
    // Ajoutez ici votre logique de navigation
  };

  // Données simulées de pays
  const pays = [
    { id: 1, nom: 'France', indice_co2: 5.2 },
    { id: 2, nom: 'Allemagne', indice_co2: 4.9 },
    { id: 3, nom: 'Italie', indice_co2: 5.5 },
  ];

  return (
    <View style={styles.wrapper}>
      {/* Sidebar */}
      <View style={[styles.sidebarWrapper, windowWidth < 768 ? styles.sidebarWrapperSmall : null]}>
        <Text style={styles.sidebarHeading}>Sante-APP</Text>
        {/* Ajoutez d'autres éléments de navigation de la sidebar ici */}
        <TouchableOpacity onPress={() => navigate('Dashboard')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Dashboard</Text>
        </TouchableOpacity>
        {/* Autres éléments de la sidebar */}
      </View>

      {/* Page Content */}
      <ScrollView style={[styles.pageContentWrapper, windowWidth < 768 ? styles.pageContentWrapperSmall : null]}>
        <View style={[styles.container, windowWidth < 768 ? styles.containerSmall : null]}>
          <Text style={styles.heading}>Pays</Text>
          {pays.map(pay => (
            <View key={pay.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>{pay.nom}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text>Indice CO2: {pay.indice_co2}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarWrapper: {
    width: 250,
    backgroundColor: '#3490dc',
    padding: 20,
  },
  sidebarWrapperSmall: {
    width: 100,
  },
  sidebarHeading: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  listGroupItem: {
    backgroundColor: '#3490dc',
    padding: 15,
    marginBottom: 5,
  },
  listGroupItemText: {
    color: 'white',
  },
  pageContentWrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  pageContentWrapperSmall: {
    padding: 10,
  },
  container: {
    maxWidth: 1200,
  },
  containerSmall: {
    maxWidth: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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

export default CountriesScreen;
