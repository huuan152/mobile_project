import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomListPost from '../../Components/ListPost';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { listPostSelector, postSelector, userSelector } from '../../redux/selectors';
import { postSlice } from '../../redux/slice/postSlice';

const Favorite = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);
    const { favoritePost } = useSelector(listPostSelector);
    console.log('This is user', user);
    useEffect(() => {
        dispatch(postSlice.actions.getFavoritePost(user.favoriteMotels));
    }, []);
    return (
        <ScrollView 
            stickyHeaderIndices={[0]}
            //showsVerticalScrollIndicator={false} 
            style={styles.container}
        >
            <View style={styles.headerField}>
                <Text style={styles.header}>{`Yêu thích`}</Text>
            </View>
            <CustomListPost data={favoritePost} />
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

export default Favorite;
