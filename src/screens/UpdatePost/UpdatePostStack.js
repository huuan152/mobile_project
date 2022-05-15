import React from 'react';
import { Pressable, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Location from './Location';
import Info from './Info';
import Images from './Images';
import Confirm from './Confirm';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { useDispatch, useSelector } from 'react-redux';
import { postLocationScreenSelector, postInfoScreenSelector, postImagesScreenSelector, postConfirmScreenSelector, postSelector, motelUpdateID } from '../../redux/selectors';
import myMotelApi from '../../api/myMotelApi';
import { useNavigation } from '@react-navigation/native';
import { UpdatePostSlice } from './UpdatePostSlice';

const Stack = createStackNavigator();

export default function UpdatePostStack() {
    const LocationScreen = useSelector(postLocationScreenSelector);
    const InfoScreen = useSelector(postInfoScreenSelector);
    const ImagesScreen = useSelector(postImagesScreenSelector);
    const ConfirmScreen = useSelector(postConfirmScreenSelector);
    const PostData = useSelector(postSelector);
    const motelID = useSelector(motelUpdateID);
    const nav = useNavigation();
    const dispatch = useDispatch();

    const updateMyMotelInfo = async () => {
        try {
            let myNewMotel = {...PostData};
            delete myNewMotel.thumbnail;
            delete myNewMotel.images
            const utilities = [];
            for (const utility in myNewMotel.utilities) {
                if (myNewMotel.utilities[utility] === BUTTON_COLORS.colorPicked) {
                    utilities.push(utility);
                }
            }
            myNewMotel = {
                ...myNewMotel,
                utilities: utilities
            }
            console.log(myNewMotel);
            await myMotelApi.editMyMotelInfo(myNewMotel, motelID).then((response) => {
                console.log(response);
                dispatch(UpdatePostSlice.actions.updateMotels());
                dispatch(UpdatePostSlice.actions.resetPostDetail());
                nav.navigate('MyPostScreen');
                ToastAndroid.show("Cập nhật thành công!",ToastAndroid.SHORT);
            }); 
        } catch (error) {
            console.log(error.message);
        }
    }

    const nextScreen = async (navigation, name) => {
        try {
            if (name === 'Location' && LocationScreen) {
                navigation.navigate("Info");
            } else if (name === 'Info' && InfoScreen) { 
                navigation.navigate("Images");
            } else if (name === 'Images' && ImagesScreen) {
                navigation.navigate("Confirm");
            } else if (name === 'Confirm' && ConfirmScreen) {
                if (motelID !== "") {
                    updateMyMotelInfo()
                } else {
                    let myNewMotel = {...PostData};
                    let images = [...myNewMotel.images];
                    // delete myNewMotel.thumbnail;
                    // delete myNewMotel.images
                    // const utilities = [];
                    // for (const utility in myNewMotel.utilities) {
                    //     if (myNewMotel.utilities[utility] === BUTTON_COLORS.colorPicked) {
                    //         utilities.push(utility);
                    //     }
                    // }
                    // myNewMotel = {
                    //     ...myNewMotel,
                    //     utilities: utilities
                    // }
                    // const motelID = createMyNewMotelInfo(myNewMotel);
                    // console.log("motelID", motelID);

                    const data = new FormData();

                    const thumbnailImg = PostData.images[PostData.thumbnail];
                    images.splice(PostData.thumbnail, 1);
                    images.unshift(thumbnailImg);
                    
                    for (const image in images) {
                        data.append('images', images[image].uri);
                    }

                    console.log(data);
                    createMyNewMotelImages("627f5edc27fe1aea6972f333", data);
                    // dispatch(UpdatePostSlice.actions.resetPostDetail());
                    // navigation.navigate("Location");
                    // ToastAndroid.show('Đăng tin thành công',ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show('Vui lòng điền thông tin hợp lệ!',ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Stack.Navigator initialRouteName="Location" screenOptions={{
            title: "Sửa tin",
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
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <Text style={{...styles.text, paddingLeft: 25}}>Quay lại</Text>
                        </Pressable>
                    ),
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
                            <Text style={{...styles.text, paddingRight: 25}}>Đăng</Text>
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