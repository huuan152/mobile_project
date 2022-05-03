import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Modal, TouchableOpacity, ToastAndroid, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import IconRec from 'react-native-vector-icons/MaterialCommunityIcons';
import BUTTON_COLORS from '../../../Constants/Utilities';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { updatePostDetail } from '../../../redux/actions';

const Item = (props) => {
    const { price, address, area, title } = props;
    const nav = useNavigation();
    const postDetail = {
        address: '121 P. Phúc Tân, Phúc Tân, Hoàn Kiếm, Hà Nội, Vietnam',
        postType: 'renting',
        // Loai phong?
        rentalPrice: 3000000,
        // Dien tich?
        utilities: {
            "wifi": BUTTON_COLORS.colorBasic,
            "toilet": BUTTON_COLORS.colorBasic,
            "motorcycle": BUTTON_COLORS.colorBasic,
            "clock": BUTTON_COLORS.colorBasic,
            "food": BUTTON_COLORS.colorBasic,
            "air-conditioner": BUTTON_COLORS.colorBasic,
            "ice-cream": BUTTON_COLORS.colorBasic,
            "washing-machine": BUTTON_COLORS.colorBasic
        },
        title: "Cần rao bán nhà gấp",
        // lien he voi
        // so dien thoai
        description: "Đến xem thì biết"
    }
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);

    const ItemClicked = (text) => {
        ToastAndroid.show(text,ToastAndroid.SHORT);
    }

    const SeePost = () => {

    }

    const UpdatePost = () => {
        dispatch(updatePostDetail(postDetail));
        nav.navigate('UpdatePostStack');
    }

    const DeletePost = () => {
        Alert.alert(
            "Xóa bài đăng",
            "Bạn có chắc chắn muốn xóa bài đăng này không?",
            [
                {
                    text: "Hủy",
                    onPress: () => ToastAndroid.show("Cancel Pressed",ToastAndroid.SHORT),
                    style: "cancel"
                },
                { 
                    text: "Đồng ý", 
                    onPress: () => ToastAndroid.show("OK Pressed",ToastAndroid.SHORT)
                }
            ]
        );
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => ItemClicked('Xem')} style={{...styles.options, paddingBottom: 25}}>
                            <FontAwesome 
                                name="eye" 
                                color={BUTTON_COLORS.colorPicked}
                                backgroundColor="transparent" 
                                underlayColor="transparent" 
                                size={20} 
                                style={styles.buttonIcon}
                            />
                            <Text style={{color: BUTTON_COLORS.colorPicked, flexBasis: "25%",}}>Xem</Text>
                        </TouchableOpacity>
                        <View style={{ height: 0.5, width: '100%', backgroundColor: BUTTON_COLORS.colorBasic}}></View>
                        <TouchableOpacity onPress={() => UpdatePost()} style={{...styles.options, paddingBottom: 25}}>
                            <FontAwesome 
                                name="edit" 
                                color={BUTTON_COLORS.colorPicked}
                                backgroundColor="transparent" 
                                underlayColor="transparent" 
                                size={20} 
                                style={styles.buttonIcon}
                            />
                            <Text style={{color: BUTTON_COLORS.colorPicked, flexBasis: "25%",}}>Sửa</Text>
                        </TouchableOpacity>
                        <View style={{ height: 0.5, width: '100%', backgroundColor: BUTTON_COLORS.colorBasic}}></View>
                        <TouchableOpacity onPress={() => DeletePost()} style={styles.options}>
                            <FontAwesome 
                                name="trash" 
                                color={'red'}
                                backgroundColor="transparent" 
                                underlayColor="transparent" 
                                size={20} 
                                style={styles.buttonIcon}
                            />
                            <Text style={{color: 'red', flexBasis: "25%",}}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                <View style={styles.content}>
                    <View style={styles.imageField}>
                        <Text style={styles.price}>{`${price} triệu`}</Text>
                        <Image source={require('../../../images/phong_tro.png')} style={styles.image}/>
                    </View>
                    <View style={styles.infoField}>
                        <View style={styles.titleField}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.addressField}>
                            <Icon size={16} color={BUTTON_COLORS.colorPicked} name="location" />
                            <Text style={styles.addressText}>{address}</Text>
                        </View>
                        <View style={styles.areaField}>
                            <IconRec size={16} color={BUTTON_COLORS.colorPicked} name="vector-rectangle" />
                            <Text style={styles.addressText}>{`${area} m2`}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexBasis: '100%',
    }, 
    content: {
        flexDirection: 'row'
    },
    imageField: {
        flex: 2,
        padding: 12
    },
    image: {
        width: '100%',
        height: 140
    },
    infoField: {
        flex: 5,
        marginTop: 3,
        marginRight: 36
    },
    price: {
        marginBottom: -32,
        paddingVertical: 3,
        paddingHorizontal: 20,
        backgroundColor: BUTTON_COLORS.colorPicked,
        width: '80%',
        color: '#ffffff',
        borderRadius: 4,
        zIndex: 99
    },
    title: {
        color: BUTTON_COLORS.colorPicked,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6
    },
    addressField: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    areaField: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressText: {
        marginLeft: 8
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonIcon: {
        textShadowColor: 'black',
        flexBasis: "25%",
    },
    options: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})
export default Item;