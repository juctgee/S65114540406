import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar'; // นำเข้า ProgressBar จาก react-native-progress

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BudgetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  // Get the budget details passed from CreateBudgetScreen
  const newBudget = route.params?.newBudget;
  const alertMessage = route.params?.alertMessage || '';

  const [budgets, setBudgets] = useState(newBudget ? [newBudget] : [
    { name: 'Shopping', remaining: 500, total: 400, color: 'orange' },
    { name: 'Transportation', remaining: 350, total: 700, color: 'blue' }
  ]);
  
  const [showAlert, setShowAlert] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const transactions = [
    { category: 'Shopping', amount: 550 },
    { category: 'Transportation', amount: 800 }
  ];

  const calculateExpenses = () => {
    const updatedBudgets = [...budgets];
    let isOverBudget = false;

    transactions.forEach((transaction) => {
      const budgetIndex = updatedBudgets.findIndex((budget) => budget.name === transaction.category);
      if (budgetIndex !== -1) {
        updatedBudgets[budgetIndex].remaining = updatedBudgets[budgetIndex].total - transaction.amount;

        if (updatedBudgets[budgetIndex].remaining < 0) {
          isOverBudget = true;
        }
      }
    });

    setBudgets(updatedBudgets);

    if (isOverBudget) {
      setShowAlert(true);
      setStatusMessage('ใช้จ่ายเกินงบประมาณแล้ว!');
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    } else {
      setShowAlert(true);
      setStatusMessage('ใช้จ่ายภายในงบประมาณ');
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 0 ? 11 : prevIndex - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prevIndex => (prevIndex === 11 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    calculateExpenses();
  }, []);

  const handleContinue = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {showAlert && (
        <View style={[styles.alert, { backgroundColor: statusMessage === 'ใช้จ่ายภายในงบประมาณ' ? 'green' : 'red' }]}>
          <Ionicons name={statusMessage === 'ใช้จ่ายภายในงบประมาณ' ? 'checkmark' : 'warning'} size={24} color="white" />
          <Text style={styles.alertText}>{statusMessage}</Text>
        </View>
      )}

      {alertMessage && (
        <View style={[styles.alert, { backgroundColor: 'red' }]}>
          <Ionicons name="warning" size={24} color="white" />
          <Text style={styles.alertText}>{alertMessage}</Text>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.budgetList}>
        {budgets.map((budget, index) => (
          <View key={index} style={styles.budgetItem}>
            <Text style={styles.budgetName}>{budget.name}</Text>
            <ProgressBar
              progress={budget.remaining / budget.total}
              width={null} // ขยายให้เต็มความกว้างของ container
              height={8} // ความสูงของ ProgressBar
              color={budget.color} // กำหนดสีของ ProgressBar
              unfilledColor="gray" // สีของส่วนที่ยังไม่เต็ม
            />
            <Text style={styles.budgetRemaining}>
              Remaining: ${budget.remaining} / ${budget.total}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C52FF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: {
    color: 'white',
    fontSize: 18,
  },
  budgetList: {
    marginTop: 30,
  },
  budgetItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  budgetName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  budgetRemaining: {
    color: '#333',
    marginTop: 10,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  alertText: {
    color: 'white',
    marginLeft: 10,
  },
  continueButton: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BudgetScreen;
