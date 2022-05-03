import React from 'react';
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Item from './Item';
import BUTTON_COLORS from '../../../Constants/Utilities/index';

const MyPostScreen = () => {
    const mock_data = {
        price: 4,
        address: 'tòa nhà số 36, Phạm Hùng, quận Cầu Giấy',
        area: 40,
        title: "Ưu đãi căn hộ"
    }
    const number = [0, 1, 2, 3, 4 ,5 ,6 ,7, 8];
    return (
        <ScrollView 
            stickyHeaderIndices={[0]}
            //showsVerticalScrollIndicator={false} 
            style={styles.container}
        >
            <View></View>
            <View style={styles.list}>
                {number.map((element, index) => {
                    return (
                        <Item {...mock_data} key={index}/>
                    )
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: 24,
        backgroundColor: 'white'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    headerField: {
        paddingTop: 24,
        paddingBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderBottomColor: '#bdbdbd',
        borderBottomWidth: 1
    },
    header: {
        fontSize: 18,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: 'bold'
    }
})

export default MyPostScreen; 