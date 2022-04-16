import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Post from '../../../Components/SinglePostForList';
import { useNavigation } from '@react-navigation/native';
const mock_data = {
    price: 4,
    address: 'tòa nhà số 36, Phạm Hùng, quận Cầu Giấy',
    area: 40,
}
const data = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const ListPost = () => {
    const nav = useNavigation()
    const onPressAddPost = () => {
        nav.navigate('Add Post')
    }
    return (
        <ScrollView style={styles.listPostContainer}>
            <View style={styles.containter}>
                <View style={styles.titleField}>
                    <Text style={styles.appName}>{'Nhà trọ 360'}</Text>
                    <TouchableOpacity onPress={onPressAddPost} style={styles.addPostButton}>
                        <IconAntDesign size={24} name='addfile' color={'rgba(71, 98, 234, 0.8)'} />
                    </TouchableOpacity>
                </View>
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
        color: 'rgba(71, 98, 234, 0.8)',
        fontWeight: 'bold',
        marginLeft: 12,
        marginTop: 24
    },
    titleField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addPostButton: {
        marginRight: 18
    }
})

export default ListPost