import React from 'react';
// import SignInSignUp from './src/screens/SignInSignUpStack';
import AddPostStack from './src/screens/AddPostStack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from './src/screens/Post';
import SeachScreen from './src/screens/Search';
import Favorite from './src/screens/Favorite';
import ProfileStack from './src/screens/Profile/ProfileStack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size}/>
          )}} name="List Post" component={PostScreen} />
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Tìm kiếm',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size}/>
          )}} name="Search Tab" component={SeachScreen} />
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Đăng bài',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" color={color} size={size}/>
          )}} name="Add Post" component={AddPostStack} />
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Yêu thích',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" color={color} size={size}/>
          )}} name="Favorite" component={Favorite} />
        <Tab.Screen options={{headerShown: false, tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size}/>
          )}} name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}