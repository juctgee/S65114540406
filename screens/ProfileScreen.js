import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/images/cat.png')} // ตรวจสอบว่าพาธนี้ถูกต้อง
          style={styles.avatar}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Thang Thongpunya</Text>
          <Text style={styles.profileEmail}>thang****@gmail.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome5 name="pen" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIconContainer}>
          <FontAwesome5 name="wallet" size={24} color="#A020F0" />
        </View>
        <Text style={styles.menuText}>Account</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIconContainer}>
          <FontAwesome5 name="cog" size={24} color="#A020F0" />
        </View>
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Section */}
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIconContainer}>
          <FontAwesome5 name="sign-out-alt" size={24} color="red" />
        </View>
        <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f0e6ff',
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },  
});
