import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Welcome from './screens/Welcome';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Welcome"
          component={Welcome}
        />
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

