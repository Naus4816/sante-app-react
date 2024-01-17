import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('URL_DE_VOTRE_API', { email, password });
        } catch (error) {
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.headerTitle}>Connectez-vous à votre compte</Text>
                </View>
                <View style={styles.cardBody}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.buttonPrimary} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* Logique pour mot de passe oublié */ }}>
                        <Text style={styles.forgotPasswordLink}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.welcomeTitle}>Bienvenue sur Santé-App</Text>
            <Text style={styles.welcomeText}>Rejoignez-nous et découvrez le moyen premium de vérifier votre état de santé, de gérer vos rendez-vous et de rester au courant de vos besoins médicaux en toute simplicité.</Text>
            <TouchableOpacity onPress={() => {/* Navigation ou action */}}>
                <Text style={styles.registerLink}>Inscrivez-vous maintenant</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 30, // Add padding at the top of the screen to push the content down
    },
    card: {
        borderRadius: 20,
        elevation: 5,
        backgroundColor: '#fff',
        width: 500, // Adjust the width to match the first image
        alignSelf: 'flex-end',
        marginRight: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        overflow: 'hidden',
        marginTop: 20, // Add top margin if needed
    },
    cardHeader: {
        backgroundColor: '#3490dc',
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardBody: {
        padding: 20,
        width: '100%', 
    },
    welcomeTitle: {
        fontSize: 24,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    welcomeText: {
        fontSize: 16,
        alignSelf: 'flex-start',
        textAlign: 'center',
        marginBottom: 20,
    },
    registerLink: {
        color: '#3490dc',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ced4da',
        width: '100%', 
        marginBottom: 20,
        padding: 15,
    },
    buttonPrimary: {
        backgroundColor: '#3490dc',
        borderRadius: 20,
        padding: 15,
        width: '100%', 
        alignItems: 'center', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    });
    
    
export default LoginForm;
