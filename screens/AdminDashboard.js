import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const AdminScreen = () => {
  // Remplacer par la navigation réelle et les fonctions de gestion des clics
  const navigate = (route) => {
    console.log(`Navigating to ${route}`);
  };

  return (
    <View style={styles.wrapper}>
      {/* Sidebar */}
      <View style={[styles.sidebarWrapper, windowWidth < 768 ? styles.sidebarWrapperSmall : null]}>
        <Text style={styles.sidebarHeading}>Sante-APP</Text>
        <TouchableOpacity onPress={() => navigate('Dashboard')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('ActesDeSante')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Actes de Santé</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Deplacements')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Déplacements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Pays')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Pays</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Utilisateurs')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Utilisateurs</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={[styles.pageContentWrapper, windowWidth < 768 ? styles.pageContentWrapperSmall : null]}>
        <View style={[styles.container, windowWidth < 768 ? styles.containerSmall : null]}>
          <Text style={styles.heading}>Tableau de Bord</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Cartographie des Coûts des Actes de Santé à l'échelle Mondiale</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Une analyse détaillée des coûts des actes de santé dans différents pays...</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Recommandations pour le Tourisme de Santé</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Conseils pratiques et recommandations pour ceux qui envisagent le tourisme de santé...</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Impact Environnemental : Trace Carbone des Déplacements en Tourisme de Santé</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Évaluation de l'empreinte carbone liée aux voyages internationaux pour des soins médicaux...</Text>
            </View>
          </View>
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
  },
  sidebarWrapperSmall: {
    width: 150, // Réduire la largeur pour les petits écrans
  },
  sidebarHeading: {
    textAlign: 'center',
    color: 'white',
    padding: 20,
    fontSize: 20,
  },
  listGroupItem: {
    padding: 15,
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
    padding: 10, // Réduire le padding pour les petits écrans
  },
  container: {
    maxWidth: 1200,
  },
  containerSmall: {
    maxWidth: '100%', // Utiliser toute la largeur pour les petits écrans
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
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
  },
  cardHeaderText: {
    color: 'white',
    fontSize: 18,
  },
  cardBody: {
    padding: 20,
  },
});

export default AdminScreen;