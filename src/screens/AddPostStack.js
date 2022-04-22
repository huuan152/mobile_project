import React from 'react';
import { Pressable, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Location from './Location';
import Info from './Info';
import Images from './Images';
import Confirm from './Confirm';
import BUTTON_COLORS from '../Constants/Utilities/index';

const Stack = createStackNavigator();

export default function AddPostStack() {
    return (
            <Stack.Navigator initialRouteName="Location" screenOptions={{
                title: 'Đăng tin',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 23
                },
                headerTintColor: BUTTON_COLORS.colorPicked,
                headerTitleAlign: 'center',
            }}>
                <Stack.Screen 
                    name="Location" 
                    component={Location} 
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Pressable onPress={() => navigation.navigate("Info")}>
                                <Text style={{...styles.text, paddingRight: 25}}>Tiếp theo</Text>
                            </Pressable>
                        ),
                })}/>
                <Stack.Screen 
                    name="Info" 
                    component={Info}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <Text style={{...styles.text, paddingLeft: 25}}>Quay lại</Text>
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => navigation.navigate("Images")}>
                                <Text style={{...styles.text, paddingRight: 25}}>Tiếp theo</Text>
                            </Pressable>
                        ),
                })}/>
                <Stack.Screen 
                    name="Images" 
                    component={Images}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <Text style={{...styles.text, paddingLeft: 25}}>Quay lại</Text>
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => navigation.navigate("Confirm")}>
                                <Text style={{...styles.text, paddingRight: 25}}>Tiếp theo</Text>
                            </Pressable>
                        ),
                })}/>
                <Stack.Screen 
                    name="Confirm" 
                    component={Confirm}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <Text style={{...styles.text, paddingLeft: 25}}>Quay lại</Text>
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => ToastAndroid.show('Đăng',ToastAndroid.SHORT)}>
                                <Text style={{...styles.text, paddingRight: 25}}>Tiếp theo</Text>
                            </Pressable>
                        ),
                })}/>
            </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    text: {
        color: BUTTON_COLORS.colorPicked, 
        fontSize: 18, 
    }
});