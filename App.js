import React from 'react';
import SignInSignUpStack from './src/screens/User/SignInSignUpStack';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import ContentNavigator from './src/screens/ContentNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="SignInSignUpStack">
          <Stack.Screen name="SignInSignUpStack" component={SignInSignUpStack} options={{headerShown: false}}/>
          <Stack.Screen name="ContentNavigator" component={ContentNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}