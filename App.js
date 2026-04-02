import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';

const Stack = createNativeStackNavigator();

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
    primary: '#34d399',
  },
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={AppDarkTheme}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#1e1e1e' },
            headerTintColor: '#ffffff',
            headerTitleStyle: { fontWeight: 'bold' },
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Shotshell Loads' }} 
          />
          <Stack.Screen 
            name="Details" 
            component={DetailScreen} 
            options={{ title: 'Load Details' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
