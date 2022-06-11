import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Item from './Item';

const CustomListPost = ({data}) => {
    return (
        <ScrollView 
            stickyHeaderIndices={[0]}
            //showsVerticalScrollIndicator={false} 
            style={styles.container}
        >
            <View style={styles.list}>
                {data && data.map((element, index) => {
                    return (
                        <Item {...element} key={index}/>
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
        backgroundColor: '#f0f0f0'
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
        color: '#2089dc',
        fontWeight: 'bold'
    }
})

export default CustomListPost;