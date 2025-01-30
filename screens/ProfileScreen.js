// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen({ route, navigation }) {
  const { userName, email } = route.params || {};  // Safely extract user data from route.params

  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    navigation.replace('Login');
  };

  const cancelLogout = () => {
    setModalVisible(false);
  };

  if (!userName || !email) {
    return <Text>Loading...</Text>;  // Or display a placeholder if user data is unavailable
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={require('../assets/images/cat.png')} style={styles.avatar} />
        <TouchableOpacity style={styles.editButton}>
          <FontAwesome5 name="pen" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      <Text style={styles.profileName}>{userName}</Text>
      <Text style={styles.profileEmail}>{email}</Text>

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
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <View style={styles.menuIconContainer}>
          <FontAwesome5 name="sign-out-alt" size={24} color="red" />
        </View>
        <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
      </TouchableOpacity>

      {/* Modal for logout confirmation */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <Text style={styles.modalText}>Are you sure you wanna logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={cancelLogout}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#6C63FF' }]} onPress={confirmLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
