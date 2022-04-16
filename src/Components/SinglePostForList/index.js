import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import IconRec from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import BUTTON_COLORS from '../../Constants/Utilities/index';

//import { styles } from './style';
const Post = (props) => {
    const nav = useNavigation();
    const { price, address, area, isOdd, favoritePage } = props;

    return (
        <TouchableOpacity style={styles.containerForHomePage} onPress={() => {nav.navigate('Post')}}>
            <View style={isOdd ? styles.oddCard : styles.evenCard}>
                <View style={styles.imageField}>
                    <Image source={require('../../images/phong_tro.png')} style={styles.image}/>
                    <Text style={styles.price}>{`${price} triệu`}</Text>
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
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    containerForHomePage: {
        flexBasis: "50%",
        marginBottom: 8
    },
    evenCard: {
        marginLeft: 8,
        marginRight: 3
    },
    oddCard: {
        marginRight: 8,
        marginLeft: 3
    },
    imageField: {
        width: '100%',
    },
    image: {
        width: "100%",
        height: 140
    },
    price: {
        marginTop: -32,
        paddingVertical: 6,
        paddingHorizontal: 22,
        backgroundColor: BUTTON_COLORS.colorPicked,
        width: '45%',
        color: '#ffffff',
        borderRadius: 4
    },
    addressField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8
    },
    addressText: {
        paddingLeft: 8
    },
    areaField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
export default Post;