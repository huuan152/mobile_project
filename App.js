import React from 'react';
import { Button } from 'react-native';
// import SignInSignUp from './src/screens/SignInSignUpStack';
import AddPostStack from './src/screens/AddPostStack';
//import NewPost from './src/screens/NewPost';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from './src/screens/Post';
import Map from './src/Components/map';
import Location from './src/screens/Location';
import SeachScreen from './src/screens/Search';
import Favorite from './src/screens/Favorite';
import Profile from './src/screens/Profile';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          options={{
            headerShown: false,
          }}
          name="List Post" 
          component={PostScreen}
        />
        {/* <Tab.Screen options={{headerShown: false}} name="Add Post" component={AddPostStack} /> */}
        <Tab.Screen options={{headerShown: false}} name="Search Tab" component={SeachScreen} />
        <Tab.Screen options={{headerShown: false}} name="Favorite" component={Favorite} />
        <Tab.Screen options={{headerShown: false}} name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
    // <Map address={"24 bảo linh phường phúc tân quận hoàn kiếm thành phố hà nội"}/>
    // <Location></Location>
  );
}