import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import BUTTON_COLORS from '../../Constants/Utilities/index';

const Stack = createStackNavigator();

export default function SignInSignUp() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{
          headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 23
          },
          headerTintColor: BUTTON_COLORS.colorPicked,
          headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Đăng ký'}} />
    </Stack.Navigator>
  );
}