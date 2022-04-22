import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Post from '../../../Components/SinglePostForList';
import BUTTON_COLORS from '../../../Constants/Utilities/index';

const mock_data = {
    price: 4,
    address: 'tòa nhà số 36, Phạm Hùng, quận Cầu Giấy',
    area: 40,
}
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ListPost = () => {
    return (
        <ScrollView style={styles.listPostContainer}>
            <View style={styles.container}>
                <Text style={styles.appName}>{'Nhà trọ 360'}</Text>
                <View style={styles.row1}>
                    {data.map((element, index) => {
                        return <Post key={index} isOdd={index % 2 === 1 ? true : false} {...mock_data} />
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
    }
})

export default ListPost