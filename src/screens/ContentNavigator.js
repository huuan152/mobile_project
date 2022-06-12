import React, { useEffect } from "react";
import AddPostStack from "./AddPost/AddPostStack";
import PostScreen from "./Post";
import SearchStack from "./Search/SearchStack";
import FavoriteStack from "./Favorite/FavoriteStack";
import ProfileStack from "./Profile/ProfileStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function ContentNavigator() {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator initialRouteName="List Posts">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
        name="List Posts"
        component={PostScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Tìm kiếm",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
        name="Search Tab"
        component={SearchStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Đăng bài",
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" color={color} size={size} />
          ),
        }}
        name="Add Post"
        component={AddPostStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Yêu thích",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" color={color} size={size} />
          ),
        }}
        name="FavoriteStack"
        component={FavoriteStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
