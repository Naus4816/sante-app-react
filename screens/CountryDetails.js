import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { apiURL } from '@env';

const CountryDetails = ({ route }) => {
  const { countryName } = route.params;
  const [healthCareServices, setHealthCareServices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Sélectionnez votre pays de départ');
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState('');
  const [paysId, setPaysId] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [distance, setDistance] = useState(null);
  const [carbonFootprint, setCarbonFootprint] = useState(null);


  const [departureCountries, setDepartureCountries] = useState([]);


  const getStoredUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur:', error);
      return null;
    }
  };
  
  
  const getActesSante = async () => {
    try {
      const response = await fetch(`${apiURL}/actesante/${countryName}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des données');
      }
      const data = await response.json();
      const paysIdValue = data.pays_id; 
      setPaysId(paysIdValue); 
      const actesSante = data.actesSante;
      const formattedData = actesSante.map(item => ({
        id: item.id.toString(),
        service: item.nom,
        prix: `${item.prix}€`
      }));
      setHealthCareServices(formattedData);
  
      // Attendre que setPaysId soit terminé avant d'appeler getRecommandations
      await getRecommandations(paysIdValue);
    } catch (error) {
      console.error("Erreur lors de la récupération des actes de santé:", error);
    }
  };
  

  const getRecommandations = async (paysId) => {
    try {
      const response = await fetch(`${apiURL}/recommandations/${paysId}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des recommandations');
      }
      const data = await response.json();
      const formattedData = data.recommandations.map(item => ({
        id: item.id.toString(),
        text: item.contenu
      }));
      setRecommendations(formattedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des recommandations:", error);
    }
  };

  const getCountriesByName = async () => {
    try {
      const response = await fetch(`${apiURL}/pays/names`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
  
      const data = await response.json();

      // Mettez à jour l'état avec la liste des noms de pays
      setDepartureCountries(data);  
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
    }
  };

  const getCountryByEnglishName = async (countryName) => {
    try {
      const response = await fetch(`${apiURL}/pays/${countryName}`);
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération des noms de pays');
      }
  
      const data = await response.json();
  
      if (data != null) {
        // Vous pouvez récupérer l'ID du pays depuis la réponse de l'API
        setSelectedCountryId(data.id);
        return data.nom_anglais ;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des noms de pays:", error);
      return null;
    }
  };
  
  useEffect(() => {
    getActesSante();
    getCountriesByName();
  }, []);

  const addTrajet = async (paysId, selectedCountryId, carbonFootprint) => {
    try {
      const userId = await getStoredUserId();
      
      const requestData = {
        user_id: userId,
        pays_id: paysId,
        pays_id2: selectedCountryId, 
        empreinte_co2: carbonFootprint,
      };
  
      const response = await fetch(`${apiURL}/deplacement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.status === 201) {
        alert('Déplacement enregistré avec succès!');
      } else {
        console.error('Erreur lors de la création du déplacement:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du trajet:', error);
      return null;
    }
  };  
    const AddRecommendation = async () => {
      try {
        const response = await fetch(`${apiURL}/recommandations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contenu: newRecommendation,
            pays_id: paysId, 
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.recommandation) {
    
            setNewRecommendation('');
    
          } else {
            console.error('Erreur lors de la création de la recommandation:', data.message);
          }
        } else {
          console.error('Erreur lors de la création de la recommandation:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la création de la recommandation:', error);
      }
      getRecommandations(paysId);
    };  
    const handleDeleteRecommendation = async (recommendationId) => {
      try {
        const response = await fetch(`${apiURL}/recommandations/${recommendationId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur réseau lors de la suppression de la recommandation');
        }
        
        setRecommendations(prevRecommendations =>
          prevRecommendations.filter(recommendation => recommendation.id !== recommendationId)
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de la recommandation:", error);
      }
    };    
    
    const handleEstimateCarbonFootprint = async (departureCountry, selectedCountry) => {
      async function getCapital(countryName) {
        const apiUrl = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
      
          if (Array.isArray(data) && data.length > 0) {
            const capital = data[0].capital[0];
            return capital;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de la capitale:', error);
          return null;
        }
      }
            
      async function getLatLng(city) {
        const apiKey = 'AIzaSyBJvL7tfCzIXc5w56h0xtbiF1_Lb5roxi4';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.status === 'OK') {
            const location = data.results[0].geometry.location;
            return { latitude: location.lat, longitude: location.lng };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des coordonnées:', error);
          return null;
        }
      }
    
      // Fonction pour calculer la distance entre deux points en utilisant la formule de la sphère
      function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Rayon de la Terre en km
        const latDelta = toRadians(lat2 - lat1);
        const lonDelta = toRadians(lon2 - lon1);
    
        const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
                  Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                  Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return earthRadius * c;
      }
    
      // Fonction pour convertir des degrés en radians
      function toRadians(degrees) {
        return degrees * (Math.PI / 180);
      }
    
      // Fonction pour calculer l'empreinte carbone
      function calculateCarbonFootprint(distance) {
        return distance * (229.97 * 0.001); // Conversion en kgCO2e/km/personne
      }
    
      async function calculateEmissions(departureCountry, selectedCountry) {      
        const englishDepartureCountry = await getCountryByEnglishName(departureCountry);
        const englishSelectedCountry = await getCountryByEnglishName(selectedCountry);
        const selectedCity = await getCapital(englishDepartureCountry);
        const departureCity = await getCapital(englishSelectedCountry);
        const departureLoc = await getLatLng(departureCity);
        const selectedLoc = await getLatLng(selectedCity);
    
        if (departureLoc && selectedLoc) {
          const distance = calculateDistance(departureLoc.latitude, departureLoc.longitude, selectedLoc.latitude, selectedLoc.longitude);
          const carbonFootprint = calculateCarbonFootprint(distance);
          
          setDistance(distance.toFixed(2));
          setCarbonFootprint(carbonFootprint.toFixed(2));      
        } else {
          console.error("Erreur de calcul des émissions de carbone lors du trajet");
        }
      }
    
      calculateEmissions(departureCountry, selectedCountry);
      
    };
    

    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Actes de Santé en {countryName}</Text>
          </View>
          <View style={styles.cardBody}>
            {healthCareServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Text style={styles.serviceText}>{service.service} - {service.prix}</Text>
              </View>
            ))}

            <Text style={styles.subtitle}>Recommandations pour {countryName}</Text>
            {recommendations.map((recommendation) => (
              <View key={recommendation.id} style={styles.recommendationCard}>
                <Text>{recommendation.text}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteRecommendation(recommendation.id)}>
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            ))}

            
            <TouchableOpacity style={styles.button} onPress={AddRecommendation}>
              <Text style={styles.buttonText}>Ajouter Recommandation</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={setNewRecommendation}
              value={newRecommendation}
              placeholder="Ajouter une recommandation"
            />
            
            <Text style={styles.subtitle}>Estimation de l'Empreinte Carbone pour le Voyage</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
              <Text>{selectedCountry}</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalView}>
                <ScrollView>
                  {departureCountries.map((country, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.countryOption}
                      onPress={() => {
                        setModalVisible(false);
                        setSelectedCountry(country);
                      }}>
                      <Text>{country}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Modal>
            
            {selectedCountry !== "Sélectionnez votre pays de départ" && (
            <TouchableOpacity style={styles.button} onPress={() => handleEstimateCarbonFootprint(countryName, selectedCountry)}>
              <Text style={styles.buttonText}>Calculer l'empreinte carbone</Text>
            </TouchableOpacity>
            )}
            <View>
            {distance !== null && carbonFootprint !== null && (
                <View>
                  <Text>Distance: {distance} km</Text>
                  <Text>Empreinte carbone: {carbonFootprint} kgCO2e/km/personne</Text>
                </View>
              )}
            </View>
            {carbonFootprint ? (
              <TouchableOpacity style={styles.button} onPress={() => addTrajet(paysId, selectedCountryId, carbonFootprint)}>
                <Text style={styles.buttonText}>Ajouter aux trajets sauvegardés</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      overflow: 'hidden',
      marginBottom: 20,
    },
    cardHeader: {
      backgroundColor: '#6AC8FF',
      padding: 20,
    },
    cardHeaderText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    cardBody: {
      padding: 20,
      backgroundColor: '#fff',
    },
    serviceCard: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      marginBottom: 10,
    },
    serviceText: {
      fontSize: 16,
      marginBottom: 5,
    },
    subtitle: {
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007bff', // Bleu plus vif
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: '#dc3545', // Rouge plus vif
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },

    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    dropdown: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 4,
      marginBottom: 20,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    countryOption: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
  });

  export default CountryDetails;