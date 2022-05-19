import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import AppNavigation from './src/screens/AppNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <AppNavigation></AppNavigation>
      </NavigationContainer>
    </Provider>
  );
}