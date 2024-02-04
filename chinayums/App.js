import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Instructions from './Instructions';
import Game from './Game';
import Summary from './Summary';
import { Analytics } from '@vercel/analytics/react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Analytics />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false // This hides the header globally
          }}
          initialRouteName="Instructions">
          <Stack.Screen name="Instructions" component={Instructions} options={{ headerShown: false }} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;