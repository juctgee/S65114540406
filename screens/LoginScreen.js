import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const Logo = ({ source, style }) => (
  <View style={styles.logoContainer}>
    <Image source={source} style={style} />
  </View>
);

export default function LoginScreen() {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      navigation.navigate('Home');
      navigation.navigate('Profile', { userName, email });
    } else {
      Alert.alert('Error', 'Please enter your email and password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Image 
        style={styles.backgroundImage} 
        source={require('../assets/images/background.png')} 
      />

      <Logo 
        source={require('../assets/images/lustres.png')} 
        style={styles.logoLarge}
      />
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Email' 
              placeholderTextColor={'gray'} 
              style={styles.input} 
              value={email}
              onChangeText={setEmail} 
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Password' 
              placeholderTextColor={'gray'} 
              secureTextEntry={true} 
              style={styles.input} 
              value={password}
              onChangeText={setPassword}  
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text 
                style={styles.signupLink} 
                onPress={() => navigation.navigate('SignUp')}  
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
  },
  logoLarge: {
    width: 200,
    height: 200,
    top: 50,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 250,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupText: {
    color: 'gray',
  },
  signupLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
