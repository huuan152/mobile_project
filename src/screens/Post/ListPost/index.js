import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, Text, Modal, ActivityIndicator } from 'react-native'
import Post from '../../../Components/SinglePostForList';
import BUTTON_COLORS from '../../../Constants/Utilities/index';
import myMotelApi from '../../../api/myMotelApi';

const ListPost = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(async() => {
        try {
            setModalVisible(true);
            await myMotelApi.getAllMotels().then((response) => {
                let motels = response;
                for (const motel in motels) {
                    delete motels[motel]["__v"]
                    //delete motels[motel]["_id"]
                    delete motels[motel]["censored"]
                    delete motels[motel]["createdAt"]
                    delete motels[motel]["owner"]
                    delete motels[motel]["rate"]
                    delete motels[motel]["updatedAt"]
                    delete motels[motel]["zoomType"]
                    let color = {
                        "wifi": BUTTON_COLORS.colorBasic,
                        "toilet": BUTTON_COLORS.colorBasic,
                        "motorcycle": BUTTON_COLORS.colorBasic,
                        "clock": BUTTON_COLORS.colorBasic,
                        "food": BUTTON_COLORS.colorBasic,
                        "air-conditioner": BUTTON_COLORS.colorBasic,
                        "ice-cream": BUTTON_COLORS.colorBasic,
                        "washing-machine": BUTTON_COLORS.colorBasic
                    }
                    for (const utility in motels[motel]["utilities"]) {
                        color[motels[motel]["utilities"][utility]] = BUTTON_COLORS.colorPicked
                    }
                    motels[motel]["utilities"] = color;
                }
                setData(motels);
            });
            setModalVisible(false);
        } catch (e) {
            console.log(e.message);
        }
    },[])

    const number = Array.from(Array(data.length).keys())

    return (
        <ScrollView style={styles.listPostContainer}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
                </View>
            </Modal>
            <View style={styles.container}>
                <Text style={styles.appName}>{'Nhà trọ 360'}</Text>
                <View style={styles.row1}>
                    {number.map((element, index) => {
                        return <Post key={index} isOdd={index % 2 === 1 ? true : false} {...data[index]} />
                    })}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listPostContainer: {
        marginTop: 36
    },  
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    row1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }, 
    appName: {
        fontSize: 32,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    // titleField: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    addPostButton: {
        marginRight: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
      }
})

export default ListPost