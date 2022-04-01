import React from 'react';
import { Pressable, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Location from './Location';
import Info from './Info';
import Images from './Images';
import Confirm from './Confirm';

const Stack = createStackNavigator();

// check the valid navigation to the next screen by accessing in state in other component, by using Redux

export default function AddPostStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Location" screenOptions={{
                title: 'Đăng tin',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 23
                },
                headerTintColor: '#4285F4',
                headerTitleAlign: 'center',
            }}>
                <Stack.Screen 
                    name="Location" 
                    component={Location} 
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <Pressable onPress={() => ToastAndroid.show('Hủy',ToastAndroid.SHORT)}>
                                <Text style={{...styles.text, paddingLeft: 25}}>Hủy</Text>
                            </Pressable>
                        ),
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
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    text: {
        color: '#4285F4', 
        fontSize: 18, 
    }
});