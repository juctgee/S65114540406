import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('Today'); // สร้างสถานะสำหรับแท็บที่ถูกเลือก
  const data = [50, 10, 40, 95, 85, 91, 35];

  const savingsData = {
    Today: [
      { icon: 'graduation-cap', label: 'Education', amount: '$220', time: '10:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: '$80', time: '03:30 PM' },
      { icon: 'utensils', label: 'Food', amount: '$50', time: '07:30 PM' },
    ],
    Week: [
      { icon: 'graduation-cap', label: 'Education', amount: '$300', time: '09:00 AM' }, // Changed amount for Week
      { icon: 'car', label: 'Buy a Car', amount: '$150', time: '02:00 PM' },
      { icon: 'utensils', label: 'Food', amount: '$100', time: '06:00 PM' },
    ],
    Month: [
      { icon: 'graduation-cap', label: 'Education', amount: '$500', time: '08:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: '$200', time: '01:00 PM' },
      { icon: 'utensils', label: 'Food', amount: '$300', time: '05:00 PM' },
    ],
    Year: [
      { icon: 'graduation-cap', label: 'Education', amount: '$1000', time: '07:00 AM' },
      { icon: 'car', label: 'Buy a Car', amount: '$500', time: '12:00 PM' },
      { icon: 'utensils', label: 'Food', amount: '$600', time: '04:00 PM' },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={40} color="#FFC0CB" />
          <Text style={styles.month}>October</Text>
          <MaterialIcons name="notifications-none" size={28} color="purple" />
        </View>

        {/* Account Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Account Balance</Text>
          <Text style={styles.balance}>$9,400</Text>
        </View>

        {/* Income & Expenses */}
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

        {/* Savings Frequency */}
        <Text style={styles.sectionTitle}>Savings Frequency</Text>
        <LineChart
          style={styles.chart}
          data={data}
          svg={{ stroke: 'purple', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
        />

        {/* Tabs for time ranges */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelectedTab('Today')}>
            <Text style={selectedTab === 'Today' ? styles.activeTab : styles.tab}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Week')}>
            <Text style={selectedTab === 'Week' ? styles.activeTab : styles.tab}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Month')}>
            <Text style={selectedTab === 'Month' ? styles.activeTab : styles.tab}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('Year')}>
            <Text style={selectedTab === 'Year' ? styles.activeTab : styles.tab}>Year</Text>
          </TouchableOpacity>
        </View>

        {/* Maximum Savings */}
        <View style={styles.savingsContainer}>
          <Text style={styles.sectionTitle}>Maximum Savings</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Savings Items */}
        {savingsData[selectedTab].map((item, index) => (
          <SavingsItem key={index} icon={item.icon} label={item.label} amount={item.amount} time={item.time} />
        ))}
      </ScrollView>
    </View>
  );
}

const SavingsItem = ({ icon, label, amount, time }) => (
  <View style={styles.savingsItem}>
    <FontAwesome5 name={icon} size={30} color="black" />
    <View style={styles.savingsDetails}>
      <Text style={styles.savingsLabel}>{label}</Text>
      <View style={styles.savingsAmountContainer}>
        <Text style={styles.savingsAmount}>{amount}</Text>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F3', // Light background to make sections pop
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  expenseCard: {
    backgroundColor: '#FF3D00',
    padding: 25,
    borderRadius: 15,
    width: width * 0.44,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  },
  savingsDetails: {
    marginLeft: 15,
    flex: 1,
  },
  savingsLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  savingsAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  seeAll: {
    color: '#4CAF50',
    fontWeight: '600',
  },
});
