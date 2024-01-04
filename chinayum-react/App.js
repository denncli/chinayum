import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Instructions from './Instructions';
import Game from './Game';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false // This hides the header globally
        }}
        initialRouteName="Instructions">
        <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;