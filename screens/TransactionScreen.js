import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const data = [
  {
    id: '1',
    category: 'Shopping',
    icon: 'basket',
    amount: '-120',
    time: '10:00 AM',
    description: 'Buy some grocery',
  },
  {
    id: '2',
    category: 'Education',
    icon: 'school',
    amount: '-13,000',
    time: '03:30 PM',
    description: 'Tuition fees',
  },
  {
    id: '3',
    category: 'Food',
    icon: 'fast-food',
    amount: '-32',
    time: '07:30 PM',
    description: 'Buy a ramen',
  },
  {
    id: '4',
    category: 'Salary',
    icon: 'cash',
    amount: '+5000',
    time: '04:30 PM',
    description: 'Salary for July',
  },
  {
    id: '5',
    category: 'Transportation',
    icon: 'car',
    amount: '-18',
    time: '09:30 PM',
    description: 'Charging',
  },
];

const TransactionScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default selected month

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={30} color="#fff" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={item.amount.startsWith('+') ? styles.amountPositive : styles.amountNegative}>
          {item.amount}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Month Selector (Placeholder for manual selection) */}
        <TouchableOpacity style={styles.monthSelector} onPress={() => alert('Select month')}>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Ionicons name="chevron-down" size={20} color="#6a0dad" />
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton} onPress={() => alert('Filter options')}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportButtonText}>See your financial report</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Today</Text>
      <FlatList
        data={data.slice(0, 3)} // แสดงแค่ 3 รายการแรก
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.sectionHeader}>Yesterday</Text>
      <FlatList
        data={data.slice(3)} // แสดงรายการที่เหลือ
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 40, // Add padding at the top to push content down
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20, // Ensures padding for the header
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
    padding: 10,
    borderRadius: 8,
  },
  monthText: {
    fontSize: 16,
    color: '#6a0dad',
    fontWeight: '600',
    marginRight: 5,
  },
  filterButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Add shadow for 3D effect
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // Increased for better spacing
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners
    backgroundColor: '#fff', // White background for contrast
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 15, // Space between items
    marginHorizontal: 20, // Added margin for better spacing
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#6a0dad',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Slight shadow for 3D effect
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: '600', // Semi-bold for better readability
  },
  descriptionText: {
    fontSize: 14,
    color: '#888',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountPositive: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountNegative: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#aaa',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '700', // Bold and larger for section headers
    marginVertical: 15, // Increased margin for better spacing
    color: '#4b0082', // Dark purple for emphasis
    paddingHorizontal: 20, // Added padding to section header
  },
  reportButton: {
    backgroundColor: '#e6e6fa',
    paddingVertical: 15, // More padding for a chunkier button
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3, // Add shadow for 3D effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginHorizontal: 20, // Added margin for better spacing
  },
  reportButtonText: {
    color: '#6a0dad',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TransactionScreen;
