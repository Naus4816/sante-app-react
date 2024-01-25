import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Jumbotron */}
      <View style={styles.jumbotron}>
        <Text style={styles.jumbotronTitle}>Bienvenue sur Sante-App!</Text>
        <Text style={styles.jumbotronSubtitle}>Votre guide global pour le coût des soins de santé et le tourisme médical.</Text>
        <View style={styles.separator} />
        <Text style={styles.jumbotronText}>Explorez les coûts des soins de santé à l'échelle mondiale et prenez des décisions éclairées concernant votre santé.</Text>
        <TouchableOpacity style={styles.jumbotronButton}>
          <Text style={styles.jumbotronButtonText}>En savoir plus</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Icon name="medkit" size={30} color="#3A8DFF" />
          <Text style={styles.featureTitle}>Service de Qualité</Text>
          <Text style={styles.featureText}>Accédez à des services de santé de haute qualité à des prix abordables.</Text>
        </View>
        <View style={styles.feature}>
          <Icon name="user-md" size={30} color="#3A8DFF" />
          <Text style={styles.featureTitle}>Experts Qualifiés</Text>
          <Text style={styles.featureText}>Consultez des spécialistes renommés dans chaque domaine médical.</Text>
        </View>
        <View style={styles.feature}>
          <Icon name="heartbeat" size={30} color="#3A8DFF" />
          <Text style={styles.featureTitle}>Soins Personnalisés</Text>
          <Text style={styles.featureText}>Recevez des soins et des traitements adaptés à vos besoins personnels.</Text>
        </View>
      </View>

      {/* Testimonials */}
      <View style={styles.testimonialContainer}>
        <Text style={styles.testimonialQuote}>"Grâce à Sante-App, j'ai pu trouver une assurance santé qui correspond parfaitement à mes attentes et à mon budget."</Text>
        <Text style={styles.testimonialAuthor}>- Jeanne D., Utilisatrice de Sante-App</Text>
      </View>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <Text style={styles.ctaTitle}>Prêt à découvrir votre solution santé ?</Text>
        <Text style={styles.ctaText}>Inscrivez-vous dès maintenant et rejoignez les milliers d'utilisateurs qui ont optimisé leur couverture santé avec nous.</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  jumbotron: {
    backgroundColor: '#6AC8FF',
    padding: 40,
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jumbotronTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  jumbotronSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginVertical: 10,
  },
  jumbotronText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  jumbotronButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  jumbotronButtonText: {
    color: '#3A8DFF',
    fontSize: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  featureText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  testimonialContainer: {
    backgroundColor: '#f0f0f0',
    padding: 30,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  testimonialQuote: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  ctaContainer: {
    backgroundColor: '#4e73df',
    padding: 30,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  ctaButtonText: {
    color: '#4e73df',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
