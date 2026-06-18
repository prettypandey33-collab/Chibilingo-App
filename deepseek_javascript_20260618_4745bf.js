import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import DictionaryScreen from './screens/DictionaryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1A2B4C' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="KoreaKonnect" component={HomeScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}