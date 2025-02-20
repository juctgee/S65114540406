import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './screens/HomeScreen';
import TransactionsScreen from './screens/TransactionScreen';
import ProfileScreen from './screens/ProfileScreen';
import BudgetScreen from './screens/BudgetScreen'; // ✅ ใช้ชื่อไฟล์ที่ถูกต้อง

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Transactions') iconName = 'exchange-alt';
          else if (route.name === 'Profile') iconName = 'user';
          else if (route.name === 'Budget') iconName = 'wallet';
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4B0082',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Budget" component={BudgetScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}
