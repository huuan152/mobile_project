import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerField}>
                <Text style={styles.header}>{`Tài khoản`}</Text>
            </View>
            <View style={styles.profileImageField}>
                <Image source={require('../../images/profile_image.png')} style={styles.profileImage} />
                <Text style={styles.username}>{`Phí Mạnh Hải`}</Text>
            </View>
            <View style={styles.buttonField}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.postedRoom}>{`Phòng đã đăng`}</Text>
                    <Icon size={24} color={BUTTON_COLORS.colorPicked} name="right" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {nav.navigate('AreaTrackingScreen')}}>
                    <Text style={styles.postedRoom}>{`Theo dõi khu vực`}</Text>
                    <Icon size={24} color={BUTTON_COLORS.colorPicked} name="right" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.logout}>{`Đăng xuất`}</Text>
                    <Icon size={24} color={BUTTON_COLORS.colorPicked} name="right" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerField: {
        paddingTop: 24,
        paddingBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#bdbdbd',
        borderBottomWidth: 1
    },
    header: {
        fontSize: 18,
        color: '#2089dc',
        fontWeight: 'bold'
    },
    profileImageField: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    username: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    buttonField: {
        borderTopColor: '#d6d6d6',
        borderTopWidth: 1,
        marginVertical: 12,
        marginHorizontal: 24
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#d6d6d6'
    },
    postedRoom: {
        fontSize: 18,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: '700'
    },
    logout: {
        fontSize: 18,
        color: BUTTON_COLORS.colorBasic,
        fontWeight: '700'
    }
})

export default Profile;