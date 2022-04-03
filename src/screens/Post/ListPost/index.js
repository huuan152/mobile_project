import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'

import Post from '../SinglePostForList';

const image_uri = 'images/phong_tro.png';
const mock_data = {
    price: 4,
    address: 'tòa nhà số 36, Phạm Hùng, quận Cầu Giấy',
    area: 40,
    image_uri
}
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ListPost = () => {
    return (
        <ScrollView>
            <View style={styles.containter}>
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
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    row1: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})

export default ListPost