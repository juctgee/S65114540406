import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // เพิ่มการใช้งาน ImagePicker

export default function ProfileScreen({ route, navigation }) {
  // รับข้อมูล userName และ email จาก route.params
  const { userName = 'ee', email = 'ee@gmail.com' } = route.params || {};

  // State สำหรับ Modal และข้อมูลที่จะแก้ไข
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false); // สำหรับเปิด/ปิด Modal แก้ไขโปรไฟล์
  const [newUserName, setNewUserName] = useState(userName); // State สำหรับเก็บชื่อใหม่
  const [newEmail, setNewEmail] = useState(email); // State สำหรับเก็บอีเมลใหม่
  const [profileImage, setProfileImage] = useState(require('../assets/images/cat.png')); // เริ่มต้นด้วยภาพ cat.png

  // Request permission for the image picker
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri }); // อัพเดต URL ของภาพ
    }
  };

  const toggleAccountModal = () => {
    setAccountModalVisible(!isAccountModalVisible);
  };

  const handleLogout = () => {
    setLogoutModalVisible(true); // เปิด Modal สำหรับยืนยันการออกจากระบบ
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.replace('Login'); // นำไปยังหน้าล็อกอิน
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false); // ปิด Modal
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  // ฟังก์ชันเปิด/ปิด Modal แก้ไขโปรไฟล์
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const saveProfile = () => {
    // ปิด Modal และอัพเดทข้อมูลที่ถูกแก้ไข
    setEditModalVisible(false);
    // ที่นี่สามารถทำการบันทึกข้อมูลใหม่ไปยังฐานข้อมูลหรือตัวแปรที่ต้องการ
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{newUserName}</Text>
          <Text style={styles.profileEmail}>{newEmail}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={toggleEditModal}>
          <FontAwesome5 name="pen" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Account Section */}
      <TouchableOpacity style={styles.menuItem} onPress={toggleAccountModal}>
        <View style={styles.menuIconContainer}>
          <FontAwesome5 name="wallet" size={24} color="#A020F0" />
        </View>
        <Text style={styles.menuText}>Account</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity style={styles.menuItem} onPress={navigateToSettings}>
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

      {/* Modal for Account Info */}
      <Modal
        visible={isAccountModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleAccountModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Account Information</Text>
            <Text style={styles.modalText}>Name: {newUserName}</Text>
            <Text style={styles.modalText}>Email: {newEmail}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={toggleAccountModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for logout confirmation */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
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

      {/* Modal for editing profile */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleEditModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={newUserName}
              onChangeText={setNewUserName}
              placeholder="Enter new name"
            />
            <TextInput
              style={styles.input}
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter new email"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={toggleEditModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#6C63FF' }]} onPress={saveProfile}>
                <Text style={styles.modalButtonText}>Save</Text>
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
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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
