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
  const navigation = useNavigation(); // ใช้ navigation hook

  // สร้าง state เพื่อเก็บข้อมูล email และ password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // ตรวจสอบ email และ password ว่าถูกต้องหรือไม่
    if (email === 'phatch@gmail.com' && password === '123456789') {
      // ถ้า email และ password ถูกต้อง ให้ไปที่หน้า HomeScreen
      navigation.navigate('Home');
    } else {
      // ถ้าไม่ถูกต้อง ให้แสดงข้อความแจ้งเตือน
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image */}
      <Image 
  style={styles.backgroundImage} 
  source={require('../assets/images/background.png')} 
/>

<Logo 
  source={require('../assets/images/lustres.png')} 
  style={styles.logoLarge}
/>

      {/* Title and Form */}
      <View style={styles.formContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Email' 
              placeholderTextColor={'gray'} 
              style={styles.input} 
              value={email}
              onChangeText={setEmail}  // เก็บค่า email
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Password' 
              placeholderTextColor={'gray'} 
              secureTextEntry={true} 
              style={styles.input} 
              value={password}
              onChangeText={setPassword}  // เก็บค่า password
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>
              Don't have an account?{' '}
              <Text 
                style={styles.signupLink} 
                onPress={() => navigation.navigate('SignUp')}  // ลิ้งไปยังหน้า SignUp
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
