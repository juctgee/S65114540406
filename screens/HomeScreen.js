import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TextInput, Image, PermissionsAndroid } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Today');
  const [savingsData, setSavingsData] = useState({
    Today: [
      { icon: 'graduation-cap', label: 'Education', amount: 220, time: '10:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: 80, time: '03:30 PM' },
      { icon: 'utensils', label: 'Food', amount: 50, time: '07:30 PM' },
    ],
    Week: [
      { icon: 'graduation-cap', label: 'Education', amount: 300, time: '09:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: 150, time: '02:00 PM' },
      { icon: 'utensils', label: 'Food', amount: 100, time: '06:00 PM' },
    ],
    Month: [
      { icon: 'graduation-cap', label: 'Education', amount: 500, time: '10:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: 400, time: '04:00 PM' },
      { icon: 'utensils', label: 'Food', amount: 200, time: '08:00 PM' },
    ],
    Year: [
      { icon: 'graduation-cap', label: 'Education', amount: 2000, time: '10:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: 1200, time: '01:00 PM' },
      { icon: 'utensils', label: 'Food', amount: 800, time: '05:00 PM' },
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ label: '', amount: '', time: '' });
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  

  // Get current month and year
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  const data = savingsData[selectedTab].map((item) => item.amount);  // Map the amounts based on selected tab

  // Request permissions for Android
  const requestPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Gallery permission denied');
    }
  };

  const handleAddItem = () => {
    if (editItemIndex !== null) {
      const updatedSavings = [...savingsData[selectedTab]];
      updatedSavings[editItemIndex] = newItem;
      setSavingsData({
        ...savingsData,
        [selectedTab]: updatedSavings,
      });
      setEditItemIndex(null); // Reset edit index
    } else {
      const updatedSavings = [...savingsData[selectedTab], newItem];
      setSavingsData({
        ...savingsData,
        [selectedTab]: updatedSavings,
      });
    }

    setShowModal(false);
    setNewItem({ label: '', amount: '', time: '' });
    setImageUri(null);  // Reset image after adding the item
  };

  const handleDeleteItem = (index) => {
    const updatedSavings = savingsData[selectedTab].filter((_, i) => i !== index);
    setSavingsData({
      ...savingsData,
      [selectedTab]: updatedSavings,
    });
  };

  const handleEditItem = (index) => {
    const itemToEdit = savingsData[selectedTab][index];
    setNewItem({ label: itemToEdit.label, amount: itemToEdit.amount, time: itemToEdit.time });
    setEditItemIndex(index);
    setShowModal(true);
  };

  const handleSelectImage = () => {
    requestPermissions();  // Request permissions before opening the gallery
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        console.log('ImagePicker Response:', response);  // Log the response to check
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={40} color="#FFC0CB" />
          <Text style={styles.month}>{currentMonth} {currentYear}</Text>
          <TouchableOpacity onPress={() => alert('Notification Clicked!')}>
          <MaterialIcons name="notifications-none" size={28} color="purple" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Account Balance</Text>
          <Text style={styles.balance}>${savingsData[selectedTab].reduce((acc, item) => acc + item.amount, 0)}</Text>
        </View>

        <View style={styles.incomeExpenseContainer}>
          <TouchableOpacity style={styles.incomeCard}>
            <Text style={styles.cardText}>Income</Text>
            <Text style={styles.income}>$5000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.expenseCard}>
            <Text style={styles.cardText}>Expenses</Text>
            <Text style={styles.expense}>$1200</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Savings Frequency</Text>
        <LineChart
          style={styles.chart}
          data={data}
          svg={{ stroke: 'purple', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        />

        <View style={styles.tabContainer}>
          {['Today', 'Week', 'Month', 'Year'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text style={selectedTab === tab ? styles.activeTab : styles.tab}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.savingsContainer}>
          <Text style={styles.sectionTitle}>Maximum Savings</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {savingsData[selectedTab]?.map((item, index) => (
          <SavingsItem
            key={index}
            icon={item.icon}
            label={item.label}
            amount={item.amount}
            time={item.time}
            onDelete={() => handleDeleteItem(index)}
            onEdit={() => handleEditItem(index)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Savings</Text>
            <TextInput
              style={styles.input}
              placeholder="Label"
              value={newItem.label}
              onChangeText={(text) => setNewItem({ ...newItem, label: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={newItem.amount}
              onChangeText={(text) => setNewItem({ ...newItem, amount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time"
              value={newItem.time}
              onChangeText={(text) => setNewItem({ ...newItem, time: text })}
            />

            <TouchableOpacity style={styles.addImageButton} onPress={handleSelectImage}>
              <Text style={styles.addImageButtonText}>Select Image</Text>
            </TouchableOpacity>

            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleAddItem}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const SavingsItem = ({ icon, label, amount, time, onDelete, onEdit }) => (
  <View style={styles.savingsItem}>
    <FontAwesome5 name={icon} size={30} color="black" />
    <View style={styles.savingsDetails}>
      <Text style={styles.savingsLabel}>{label}</Text>
      <View style={styles.savingsAmountContainer}>
        <Text style={styles.savingsAmount}>{amount}</Text>
      </View>
    </View>
    <View style={styles.deleteContainer}>
      <MaterialIcons name="edit" size={24} color="blue" onPress={onEdit} />
      <MaterialIcons name="delete" size={24} color="red" onPress={onDelete} />
      <Text style={styles.timeText}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F3',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  month: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 15,
    elevation: 8,
  },
  balanceTitle: {
    fontSize: 18,
    color: '#888',
  },
  balance: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  incomeExpenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  incomeCard: {
    width: '48%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseCard: {
    width: '48%',
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
  },
  income: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  expense: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    height: 200,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  savingsContainer: {
    marginBottom: 20,
  },
  savingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
  },
  savingsDetails: {
    flex: 1,
    marginLeft: 10,
  },
  savingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  savingsAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 18,
    color: '#4CAF50',
  },
  deleteContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: width - 40,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
  addImageButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addImageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  seeAll: {
    fontSize: 16,
    color: '#2196F3',
  },
});

