import React from 'react';
import { Pressable, Text, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Location from './Location';
import Info from './Info';
import Images from './Images';
import Confirm from './Confirm';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { useDispatch, useSelector } from 'react-redux';
import { addPostLocationScreenSelector, addPostInfoScreenSelector, addPostImagesScreenSelector, addPostConfirmScreenSelector, addPostSelector } from '../../redux/selectors';
import myMotelApi from '../../api/myMotelApi';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AddPostStack() {
    const LocationScreen = useSelector(addPostLocationScreenSelector);
    const InfoScreen = useSelector(addPostInfoScreenSelector);
    const ImagesScreen = useSelector(addPostImagesScreenSelector);
    const ConfirmScreen = useSelector(addPostConfirmScreenSelector);
    const addPostData = useSelector(addPostSelector);

    const createMyNewMotelInfo = async (motel) => {
        try {
            await myMotelApi.myNewMotelInfo(motel).then((response) => {
                console.log(response);
                return response._id;
            });
          } catch (error) {
              console.log(error.message);
          }
    }

    const createMyNewMotelImages = async (_id, images) => {
        try {
            await myMotelApi.myNewMotelImages(_id, images);
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

                    let myNewMotel = {...addPostData};
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

                    const thumbnailImg = addPostData.images[addPostData.thumbnail];
                    images.splice(addPostData.thumbnail, 1);
                    images.unshift(thumbnailImg);
                    
                    for (const image in images) {
                        console.log(images[image])
                        data.append('images', {
                            name: images[image].name,
                            type: images[image].mimeType,
                            uri: Platform.OS === 'ios' ?  images[image].uri.replace('file://', '') :  images[image].uri,
                          }
                       );
                    
                    }

                    console.log("dATA", data);
                    await createMyNewMotelImages("627f5edc27fe1aea6972f333", data);
                    // dispatch(AddPostSlice.actions.resetPostDetail());
                    // navigation.navigate("Location");
                    // ToastAndroid.show('Đăng tin thành công',ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Vui lòng điền thông tin hợp lệ!',ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Stack.Navigator initialRouteName="Location" screenOptions={{
            title: "Đăng tin",
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
                    headerLeft: () => (<Text></Text>),
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