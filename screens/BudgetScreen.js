import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // for icons

const BudgetScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="white" />
        <Text style={styles.monthText}>May</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </View>
      
      <View style={styles.body}>
        <Text style={styles.noBudgetText}>You don’t have a budget.</Text>
        <Text style={styles.subText}>Let’s make one so you’re in control.</Text>
      </View>

      <TouchableOpacity style={styles.createButton}>
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
    marginTop: 80,  // เพิ่ม marginTop เพื่อขยับลงมา
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
