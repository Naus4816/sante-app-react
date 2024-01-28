import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const navigate = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.wrapper}>
      {/* Sidebar */}
      <View style={[styles.sidebarWrapper, windowWidth < 768 ? styles.sidebarWrapperSmall : null]}>
        <Text style={styles.sidebarHeading}>Sante-APP</Text>
        <TouchableOpacity onPress={() => navigate('ActesSanteList')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Actes de Santé</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('DeplacementsList')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Déplacements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PaysList')} style={styles.listGroupItem}>
          <Text style={styles.listGroupItemText}>Pays</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('RecommandationList')} style={styles.listGroupItem}>
        <Text style={styles.listGroupItemText}>Recommandations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('UserList')} style={styles.listGroupItem}>
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
              <Text>Une analyse détaillée des coûts des actes de santé dans différents pays, offrant une comparaison transparente pour les utilisateurs.</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Recommandations pour le Tourisme de Santé</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Conseils pratiques et recommandations pour ceux qui envisagent le tourisme de santé, incluant des informations sur les destinations les plus prisées et les aspects à considérer.</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>Impact Environnemental : Trace Carbone des Déplacements en Tourisme de Santé</Text>
            </View>
            <View style={styles.cardBody}>
              <Text>Évaluation de l'empreinte carbone liée aux voyages internationaux pour des soins médicaux, soulignant l'importance d'une approche durable.</Text>
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
    width: 100, 
  },
  sidebarHeading: {
    textAlign: 'center',
    color: 'white',
    padding: 20,
    fontSize: 18, 
  },
  listGroupItem: {
    padding: 10, 
  },
  listGroupItemText: {
    color: 'white',
    fontSize: 14, 
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
    fontSize: 22, 
    color: '#333',
    marginBottom: 15, 
  },
  card: {
    borderRadius: 15, 
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
    padding: 15, 
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardHeaderText: {
    color: 'white',
    fontSize: 16, 
  },
  cardBody: {
    padding: 15, 
    fontSize: 14, 
  },
});

export default AdminScreen;
