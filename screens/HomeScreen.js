import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Today');
  const [savingsData, setSavingsData] = useState({
    Today: [
      { icon: 'graduation-cap', label: 'Education', amount: '$220', time: '10:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: '$80', time: '03:30 PM' },
      { icon: 'utensils', label: 'Food', amount: '$50', time: '07:30 PM' },
    ],
    Week: [
      { icon: 'graduation-cap', label: 'Education', amount: '$300', time: '09:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: '$150', time: '02:00 PM' },
      { icon: 'utensils', label: 'Food', amount: '$100', time: '06:00 PM' },
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ label: '', amount: '', time: '' });

  const data = [50, 10, 40, 95, 85, 91, 35];

  const handleAddItem = () => {
    const updatedSavings = [...savingsData[selectedTab], newItem];
    setSavingsData({
      ...savingsData,
      [selectedTab]: updatedSavings,
    });
    setShowModal(false);
    setNewItem({ label: '', amount: '', time: '' });
  };

  const handleDeleteItem = (index) => {
    const updatedSavings = savingsData[selectedTab].filter((_, i) => i !== index);
    setSavingsData({
      ...savingsData,
      [selectedTab]: updatedSavings,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={40} color="#FFC0CB" />
          <Text style={styles.month}>October</Text>
          <MaterialIcons name="notifications-none" size={28} color="purple" />
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Account Balance</Text>
          <Text style={styles.balance}>$9,400</Text>
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

const SavingsItem = ({ icon, label, amount, time, onDelete }) => (
  <View style={styles.savingsItem}>
    <FontAwesome5 name={icon} size={30} color="black" />
    <View style={styles.savingsDetails}>
      <Text style={styles.savingsLabel}>{label}</Text>
      <View style={styles.savingsAmountContainer}>
        <Text style={styles.savingsAmount}>{amount}</Text>
      </View>
    </View>
    <View style={styles.deleteContainer}>
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
    backgroundColor: '#00C853',
    padding: 25,
    borderRadius: 15,
    width: width * 0.44,
    alignItems: 'center',
  },
  expenseCard: {
    backgroundColor: '#FF3D00',
    padding: 25,
    borderRadius: 15,
    width: width * 0.44,
    alignItems: 'center',
  },
  cardText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
  },
  income: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  expense: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4CAF50',
  },
  chart: {
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    elevation: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  savingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  savingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 4,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  savingsDetails: {
    flex: 1,
    marginLeft: 10,
  },
  savingsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  savingsAmountContainer: {
    marginTop: 5,
  },
  savingsAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  deleteContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 1,
    left: '50%',
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    backgroundColor: 'purple',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3D00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
