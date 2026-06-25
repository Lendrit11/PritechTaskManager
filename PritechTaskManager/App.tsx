
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { TaskProvider } from './src/context/TaskContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { TaskDetailsScreen } from './src/screens/TaskDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}