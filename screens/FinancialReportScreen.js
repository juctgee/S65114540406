import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FinancialReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Report</Text>
      {/* เพิ่มรายละเอียดที่ต้องการในหน้า Financial Report ที่นี่ */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
