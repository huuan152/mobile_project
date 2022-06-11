import React from 'react';
import SignInSignUpStack from './User/SignInSignUpStack';
import ContentNavigator from './ContentNavigator';
import { isLogIn } from '../redux/selectors';
import { useSelector } from 'react-redux';

export default function AppNavigation() {
  const logIn = useSelector(isLogIn)

  return (
        <>
            { !logIn ?
                <SignInSignUpStack></SignInSignUpStack>
            : <ContentNavigator></ContentNavigator>
            }
        </>
  );
}