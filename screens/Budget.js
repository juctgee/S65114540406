import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BudgetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());

  // รับข้อมูลงบประมาณที่ส่งมาจากหน้า TransactionsScreen
  const newTransaction = route.params?.newTransaction;
  const alertMessage = route.params?.alertMessage || '';

  const [budgets, setBudgets] = useState([
    { name: 'Shopping', remaining: 500, total: 400, color: 'orange' },
    { name: 'Transportation', remaining: 350, total: 700, color: 'blue' }
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const alertOpacity = new Animated.Value(0);

  useEffect(() => {
    if (newTransaction) {
      calculateExpenses(newTransaction);
    }
  }, [newTransaction]);

  const calculateExpenses = useCallback((transaction) => {
    if (!transaction) return;

    const updatedBudgets = budgets.map(budget => {
      if (budget.name === transaction.category) {
        const updatedRemaining = Math.max(0, budget.remaining - transaction.amount);
        return { ...budget, remaining: updatedRemaining };
      }
      return budget;
    });

    setBudgets(updatedBudgets);

    // แสดงแจ้งเตือน
    const isOverBudget = updatedBudgets.some(budget => budget.remaining === 0);
    setStatusMessage(isOverBudget ? 'ใช้จ่ายเกินงบประมาณแล้ว!' : 'ใช้จ่ายภายในงบประมาณ');
    setShowAlert(true);
    
    Animated.timing(alertOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(alertOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowAlert(false));
      }, 3000);
    });
  }, [budgets]);

  return (
    <View style={styles.container}>
      {showAlert && (
        <Animated.View style={[styles.alert, { opacity: alertOpacity, backgroundColor: statusMessage.includes('เกิน') ? 'red' : 'green' }]}>
          <Ionicons name={statusMessage.includes('เกิน') ? 'warning' : 'checkmark'} size={24} color="white" />
          <Text style={styles.alertText}>{statusMessage}</Text>
        </Animated.View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{months[currentMonthIndex]}</Text>
        <TouchableOpacity onPress={() => setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.budgetList}>
        {budgets.map((budget, index) => (
          <View key={index} style={styles.budgetItem}>
            <Text style={styles.budgetName}>{budget.name}</Text>
            <ProgressBar progress={budget.remaining / budget.total} width={null} height={8} color={budget.color} unfilledColor="gray" />
            <Text style={styles.budgetRemaining}>Remaining: ${budget.remaining} / ${budget.total}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.goBack()}>
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
