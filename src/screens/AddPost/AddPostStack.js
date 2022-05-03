import React from 'react';
import { Pressable, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Location from './Location';
import Info from './Info';
import Images from './Images';
import Confirm from './Confirm';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { useSelector } from 'react-redux';
import { locationScreenSelector, infoScreenSelector, imagesScreenSelector, confirmScreenSelector } from '../../redux/selectors';

const Stack = createStackNavigator();

export default function AddPostStack() {
    const LocationScreen = useSelector(locationScreenSelector);
    const InfoScreen = useSelector(infoScreenSelector);
    const ImagesScreen = useSelector(imagesScreenSelector);
    const ConfirmScreen = useSelector(confirmScreenSelector);

    // nextScreen and preScreen will check if the screen is valid or not. Valid => move pre and next screen, Invalid => Toast
    const nextScreen = (navigation, name) => {
        if (name === 'Location' && LocationScreen) {
            navigation.navigate("Info");
        } else if (name === 'Info' && InfoScreen) { 
            navigation.navigate("Images");
        } else if (name === 'Images' && ImagesScreen) {
            navigation.navigate("Confirm");
        } else if (name === 'Confirm' && ConfirmScreen) {
            ToastAndroid.show('Đăng',ToastAndroid.SHORT);
        }else {
            ToastAndroid.show('Vui lòng điền thông tin hợp lệ!',ToastAndroid.SHORT);
        }
    }

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
                            <Pressable onPress={() => nextScreen(navigation, "Location")}>
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
                            <Pressable onPress={() => nextScreen(navigation, "Info")}>
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
                            <Pressable onPress={() => nextScreen(navigation, "Images")}>
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
                            <Pressable onPress={() => nextScreen(navigation, "Confirm")}>
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