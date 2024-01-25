import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import AdminDashboard from './screens/AdminDashboard';
import UserDashboard from './screens/UserDashboard';
import CountryDetails from './screens/CountryDetails';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();
const handleLogout = async () => {
  await removeUserId();

  navigation.navigate('Welcome');
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Login" 
          component={Login} 
          options={({ navigation }) => ({
            title: 'Sante-APP',
            headerStyle: {
              backgroundColor: '#ffffff', 
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null,
            headerRight: () => (
              <View style={styles.headerSideButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.headerButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.headerButton}>Register</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen 
          name="Welcome" 
          component={Welcome} 
          options={({ navigation }) => ({
            title: 'Sante-APP',
            headerStyle: {
              backgroundColor: '#ffffff', 
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null,
            headerRight: () => (
              <View style={styles.headerSideButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.headerButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.headerButton}>Register</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
            options={() => ({
              headerRight: () => (
                <View>
                  <TouchableOpacity  onPress={handleLogout} >
                    <Text style={styles.headerButton}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
        />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
            options={() => ({
              headerRight: () => (
                <View>
                  <TouchableOpacity  onPress={handleLogout} >
                    <Text style={styles.headerButton}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
        />
        <Stack.Screen
          name="Register"
          component={Register}
            options={() => ({
              headerRight: () => (
                <View>
                  <TouchableOpacity  onPress={handleLogout} >
                    <Text style={styles.headerButton}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetails}
          options={() => ({
              headerRight: () => (
                <View>
                  <TouchableOpacity  onPress={handleLogout} >
                    <Text style={styles.headerButton}>Déconnexion</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerSideButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120, 
    marginRight: 100,
  },
  headerButton: {
    color: '#000',
    paddingHorizontal: 10, 
    fontSize: 18, 
  },
});

export default App;
