import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AlbumsScreen from './screens/AlbumsScreen';
import PhotosScreen from './screens/PhotosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Nook Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Nook Signup' }} />
        <Stack.Screen name="Albums" component={AlbumsScreen} options={{ title: 'My Albums' }} />
        <Stack.Screen name="Photos" component={PhotosScreen} options={({ route }) => ({ title: route.params?.albumName || 'Photos' })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
