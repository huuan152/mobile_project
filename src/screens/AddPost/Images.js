import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, ToastAndroid, Pressable, Input } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import StepBar from './StepBar';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { useDispatch,useSelector } from 'react-redux';
import { addPostSelector } from '../../redux/selectors';
import { AddPostSlice } from './AddPostSlice';
import * as DocumentPicker from 'expo-document-picker';

export default function Images() {
    const dispatch = useDispatch();
    const [images, setImages] = useState(useSelector(addPostSelector).images);
    const [thumbnail, setThumbnail] = useState(useSelector(addPostSelector).thumbnail);
    const [countUploadedImages, setCountUploadedImages] = useState(useSelector(addPostSelector).images.length);

    const deleteImage = (index) => {
        var imgs = [...images];
        if (index == thumbnail) {
            setThumbnail(0);
        }
        imgs.splice(index,1);
        setImages(imgs);
        setCountUploadedImages(countUploadedImages - 1);
    }

    const addImages = async () => {
        try {
            if (countUploadedImages < 6) {
                // let result = await ImagePicker.launchImageLibraryAsync({
                //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
                //     allowsEditing: true,
                //     quality: 1,
                // });

                let result = await DocumentPicker.getDocumentAsync({
                    type: 'image/*'
                });
                console.log(result.uri);
                console.log(result);
                
                if (result.type !== 'cancel') {
                    var imgs = images.slice();
                    imgs.push(result);
                    setImages(imgs);
                    setCountUploadedImages(countUploadedImages + 1);
                }
            } else {
                ToastAndroid.show("Số ảnh được đăng tải vượt quá giới hạn!", ToastAndroid.SHORT);
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    useEffect(() => {
        if (countUploadedImages !== 0) {
            dispatch(UpdatePostSlice.actions.imagesScreenUpdate(true));
        } else {
            dispatch(UpdatePostSlice.actions.imagesScreenUpdate(false));
        }
        dispatch(UpdatePostSlice.actions.imagesScreenData({
            images: images,
            thumbnail: thumbnail
        }));
    },[countUploadedImages])

    useEffect(() => {
        dispatch(AddPostSlice.actions.imagesScreenData({
            images: images,
            thumbnail: thumbnail
        }));
    }, [thumbnail])

    const isThumbnail = (index) => {
        setThumbnail(index);
    }

    return (
        <>
            <StepBar step={2}/>
            <View style={{ paddingHorizontal: 30, height: '100%', backgroundColor: 'white'}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <MaterialCommunityIcons.Button name="image-plus" color={BUTTON_COLORS.colorPicked} backgroundColor="transparent" underlayColor="transparent" onPress={addImages} size={30} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: BUTTON_COLORS.colorPicked}} onPress={addImages}>Chọn ảnh</Text>
                    </View>
                    <Text style={{fontSize: 17, marginRight: 10}}>{countUploadedImages}/6</Text>
                </View>
                <View style={{borderWidth: 1, height: 490, width: 330, alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        {images[0] && 
                            <ImageBackground source={{ uri: images[0].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10}} resizeMode='cover' onPress={() => isThumbnail(0)}>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(0)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(0)}/>
                                    { thumbnail == 0 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                        {images[1] && 
                            <ImageBackground source={{ uri: images[1].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10 }} resizeMode='cover'>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(1)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(1)}/>
                                    { thumbnail == 1 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {images[2] && 
                            <ImageBackground source={{ uri: images[2].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10}} resizeMode='cover' onPress={() => isThumbnail(2)}>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(2)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(2)}/>
                                    { thumbnail == 2 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                        {images[3] && 
                            <ImageBackground source={{ uri: images[3].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10 }} resizeMode='cover' onPress={() => isThumbnail(3)}>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(3)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(3)}/>
                                    { thumbnail == 3 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {images[4] && 
                            <ImageBackground source={{ uri: images[4].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10}} resizeMode='cover' onPress={() => isThumbnail(4)}>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(4)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(4)}/>
                                    { thumbnail == 4 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                        {images[5] && 
                            <ImageBackground source={{ uri: images[5].uri }} style={{ width: 150, height: 150, marginTop: 10, marginLeft: 10}} resizeMode='cover' onPress={() => isThumbnail(5)}>
                                <Pressable style={{justifyContent: 'space-between', alignItems: 'flex-end', width: 150, height: 150}} onPress={() => isThumbnail(5)}>
                                    <Ionicons name='close-circle' size={35} color={BUTTON_COLORS.colorPicked} onPress={() => deleteImage(5)}/>
                                    { thumbnail == 5 &&
                                        <Text style={styles.thumbnail}>Ảnh đại diện</Text>
                                    }
                                </Pressable>
                            </ImageBackground>
                        }
                    </View>
                </View>
            </View>
        </>
    );
}
  
const styles = StyleSheet.create({
    textIcon: {
        fontSize: 17, 
    },
    buttonIcon: {
        justifyContent: 'center', 
        paddingRight: 0,
        textShadowColor: 'black',
    },
    thumbnail: {
        fontSize: 17, 
        backgroundColor: "rgba(66, 133, 244, 0.85)", 
        color: "white", 
        width: "100%", 
        textAlign: "center", 
        paddingVertical: 10
    }
});