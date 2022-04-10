import React from 'react';
// import SignInSignUp from './src/screens/SignInSignUpStack';
import AddPostStack from './src/screens/AddPostStack';
//import NewPost from './src/screens/NewPost';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostScreen from './src/screens/Post';
import Map from './src/Components/map';
import Location from './src/screens/Location';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     {/* <Tab.Screen name="New Post" component={NewPost} /> */}
    //     <Tab.Screen options={{headerShown: false}} name="List Post" component={PostScreen} />
    //     <Tab.Screen options={{headerShown: false}} name="Add Post" component={AddPostStack} />
    //     {/* <AddPostStack /> */}
    //   </Tab.Navigator>
    // </NavigationContainer>
    // <Map address={"24 bảo linh phường phúc tân quận hoàn kiếm thành phố hà nội"}/>
    <Location></Location>
  );
}