import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const Logo = ({ source, style }) => (
  <View style={styles.logoContainer}>
    <Image source={source} style={style} />
  </View>
);

export default function SignUpScreen() {
  const navigation = useNavigation(); // Use navigation hook

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <Image 
        style={styles.backgroundImage} 
        source={require('C:/Users/66923/Documents/Money/Money/assets/images/background.png')} 
      />

      {/* Logo */}
      <Logo 
        source={require('C:/Users/66923/Documents/Money/Money/assets/images/lustres.png')} 
        style={styles.logoLarge}
      />

      {/* Title and Form */}
      <View style={styles.formContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sign Up</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Username' 
              placeholderTextColor={'gray'} 
              style={styles.input} 
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Email' 
              placeholderTextColor={'gray'} 
              style={styles.input} 
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Password' 
              placeholderTextColor={'gray'} 
              secureTextEntry={true} 
              style={styles.input} 
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={() => {}}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Already have an account?{' '}
              <Text 
                style={styles.loginLink} 
                onPress={() => navigation.navigate('Login') /* Navigate to Login */}
              >
                Login
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
  signUpButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  signUpButtonText: {
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
  loginLink: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
