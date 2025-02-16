import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BudgetScreen = () => {
  const navigation = useNavigation(); // ใช้งาน navigation
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.body}>
        <Text style={styles.noBudgetText}>You don’t have a budget.</Text>
        <Text style={styles.subText}>Let’s make one so you’re in control.</Text>
      </View>

      {/* ปุ่มกดเพื่อไปหน้าสร้าง Budget */}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateBudgetScreen')}>
        <Text style={styles.buttonText}>Create a budget</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    marginTop: 80,
  },
  monthText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noBudgetText: {
    fontSize: 18,
    color: '#9e9e9e',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#9e9e9e',
  },
  createButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BudgetScreen;
