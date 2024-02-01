import React from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';

//Screens
import Login from './screens/Login';
import UserList from './screens/UserList';
import Welcome from './screens/Welcome';
import Register from './screens/Register';
import AdminDashboard from './screens/AdminDashboard';
import UserDashboard from './screens/UserDashboard';
import CountryDetails from './screens/CountryDetails';
import ConfirmPassword from './screens/ConfirmPassword';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import EditUserScreen from './screens/EditUser';
import AddUserScreen from './screens/AddUser';
import RecommandationListScreen from './screens/RecommandationList';
import AddRecommandationScreen from './screens/AddRecommandation';
import EditRecommandationScreen from './screens/EditRecommandation';
import DeplacementsListScreen from './screens/DeplacementsList';
import ActesSanteListScreen from './screens/ActesSanteList';
import PaysListScreen from './screens/PaysList';
import EditDeplacementsScreen from './screens/EditDeplacements';
import EditActesSanteScreen from './screens/EditActesSante';
import AddDeplacementsScreen from './screens/AddDeplacements';
import AddActesSanteScreen from './screens/AddActesSante';
import EditPaysScreen from './screens/EditPays';
import AddPaysScreen from './screens/AddPays';
import VerifyResetCode from './screens/VerifyResetCode';
import VerifyMailCode from './screens/VerifyMailCode';

const Stack = createNativeStackNavigator();

const App = () => {


  const LogoHeader = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
      <Image 
        source={require('./assets/logo.png')}
        style={styles.logo}
      />
    </TouchableOpacity>
  );

  const AdminHeaderButtons = ({ navigation }) => (
    <View style={styles.rightHeaderButtons}>
      <Button title="AdminDashboard" onPress={() => navigation.navigate('AdminDashboard')} />
      <Button title="Déconnexion" onPress={() => handleLogout(navigation)} />
    </View>
  );

  const UserHeaderButtons = ({ navigation }) => (
    <View style={styles.rightHeaderButtons}>
      <Button title="UserDashboard" onPress={() => navigation.navigate('UserDashboard')} />
      <Button title="Déconnexion" onPress={() => handleLogout(navigation)}/>
    </View>
  );
  
  const UnauthenticatedHeaderButtons = ({ navigation }) => (
    <View style={styles.rightHeaderButtons}>
      <Button title="Connexion" onPress={() => navigation.navigate('Login')} />
      <Button title="Inscription" onPress={() => navigation.navigate('Register')} />
    </View>
  );


  const handleLogout = async (navigation) => {
    try {
      await AsyncStorage.removeItem('VotreCléDeSession');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  function headerUnauthenticated(navigation) {
    return {
      headerTitle: () => <LogoHeader navigation={navigation} />,
      headerRight: () => <UnauthenticatedHeaderButtons navigation={navigation} />
    };
  }

  function headerUser(navigation) {
    return {
      headerTitle: () => <LogoHeader navigation={navigation} />,
      headerRight: () => <UserHeaderButtons navigation={navigation} />
    };
  }

  function headerAdmin(navigation) {
    return {
      headerTitle: () => <LogoHeader navigation={navigation} />,
      headerRight: () => <AdminHeaderButtons navigation={navigation} />
    };
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}  options={({ navigation }) => headerUnauthenticated(navigation)} />
        <Stack.Screen name="Login" component={Login} options={({ navigation }) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="Register" component={Register} options={({ navigation }) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} options={({ navigation }) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={({ navigation }) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={({ navigation }) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="VerifyResetCode" component={VerifyResetCode} options={({navigation}) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="VerifyMailCode" component={VerifyMailCode} options={({navigation}) => headerUnauthenticated(navigation)}/>
        <Stack.Screen name="UserDashboard" component={UserDashboard}  options={({ navigation }) => headerUser(navigation)} />
        <Stack.Screen name="CountryDetails" component={CountryDetails}  options={({ navigation }) => headerUser(navigation)} />
        <Stack.Screen name="ActesSanteList" component={ActesSanteListScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="DeplacementsList" component={DeplacementsListScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="UserList" component={UserList} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AddUser" component={AddUserScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="EditUser" component={EditUserScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="RecommandationList" component={RecommandationListScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AddRecommandation" component={AddRecommandationScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="EditRecommandation" component={EditRecommandationScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="PaysList" component={PaysListScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="EditDeplacements" component={EditDeplacementsScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="EditActesSante" component={EditActesSanteScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AddDeplacements" component={AddDeplacementsScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AddActesSante" component={AddActesSanteScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="EditPays" component={EditPaysScreen} options={({ navigation }) => headerAdmin(navigation)}/>
        <Stack.Screen name="AddPays" component={AddPaysScreen} options={({ navigation }) => headerAdmin(navigation)}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain'
  },
  rightHeaderButtons: {
    flexDirection: 'row',
    marginRight: 10,
  }
});

export default App;