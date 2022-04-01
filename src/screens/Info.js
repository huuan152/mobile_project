import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StepBar from './StepBar';

export default function Info() {
    const [post, setPost] = useState(0);
    const [room, setRoom] = useState(0);
    const [roomPrice, setRoomPrice] = useState('');
    const [area, setArea] = useState('');
    const [utilities, setUtilities] = useState({
        wifi: "#d3d3d3",
        wc: "#d3d3d3",
        parkingLot: "#d3d3d3",
        noCurfew: "#d3d3d3",
        kitchen: "#d3d3d3",
        airConditioner: "#d3d3d3",
        refrigerator: "#d3d3d3",
        washingMachine: "#d3d3d3"
    });

    const iconClicked = (utility) => {
        const updatedColor = utilities[utility] == "#d3d3d3" ? "#4285F4" : "#d3d3d3";
        setUtilities({
            ...utilities,
            [utility]: updatedColor
        });
    }

    return (
        <>
            <StepBar step={1}/>
            <ScrollView style={{height: '100%', backgroundColor: 'white', paddingTop: 15}}>
                <Text style={styles.text}>Loại tin</Text>
                <View style={styles.buttonGroup}>
                    <ButtonGroup
                        buttons={['Cho thuê', 'Tìm người ở ghép']}
                        selectedIndex={post}
                        onPress={(value) => {
                            setPost(value);
                            console.log(value);
                        }}
                        textStyle={{fontSize: 15, fontWeight: 'bold'}}
                />
                </View>
                <Text style={styles.text}>Loại phòng</Text>
                <View style={styles.buttonGroup}>
                    <ButtonGroup
                        buttons={['Phòng', 'Căn hộ', 'Căn hộ mini', 'Nguyên căn']}
                        selectedIndex={room}
                        onPress={(value) => {
                            setRoom(value);
                        }}
                        textStyle={{fontSize: 15, fontWeight: 'bold'}}
                />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 17, paddingLeft: 25}}>Giá phòng (VND)</Text>
                        <TextInput placeholder='3000000' style={styles.input} value={roomPrice} onChangeText={text => setRoomPrice(text)} keyboardType="phone-pad"></TextInput>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 17, paddingLeft: 25}}>Diện tích (m2)</Text>
                        <TextInput placeholder='20' style={styles.input} value={area} onChangeText={text => setArea(text)} keyboardType="phone-pad"></TextInput>
                    </View>
                </View>
                <Text style={{...styles.text, marginBottom: 10}}>Tiện tích phòng</Text>
                <View style={{flexDirection: 'row', marginHorizontal: 25}}>
                    <View style={{flex: 1}}>
                        <FontAwesome.Button name="wifi" color={utilities.wifi} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('wifi')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.wifi}} onPress={() => iconClicked('wifi')}>Wifi</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FontAwesome5.Button name="toilet" color={utilities.wc} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('wc')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.wc}} onPress={() => iconClicked('wc')}>WC riêng</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Fontisto.Button name="motorcycle" color={utilities.parkingLot} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('parkingLot')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.parkingLot}} onPress={() => iconClicked('parkingLot')}>Chỗ để xe</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FontAwesome5.Button name="clock" color={utilities.noCurfew} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('noCurfew')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.noCurfew}} onPress={() => iconClicked('noCurfew')}>Tự do</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 25}}>
                    <View style={{flex: 1}}>
                        <MaterialCommunityIcons.Button name="food" color={utilities.kitchen} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('kitchen')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.kitchen}} onPress={() => iconClicked('kitchen')}>Bếp</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <MaterialCommunityIcons.Button name="air-conditioner" color={utilities.airConditioner} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('airConditioner')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.airConditioner}} onPress={() => iconClicked('airConditioner')}>Điều hòa</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FontAwesome5.Button name="ice-cream" color={utilities.refrigerator} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('refrigerator')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.refrigerator}} onPress={() => iconClicked('refrigerator')}>Tủ lạnh</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <MaterialCommunityIcons.Button name="washing-machine" color={utilities.washingMachine} backgroundColor="transparent" underlayColor="transparent" onPress={() => iconClicked('washingMachine')} size={45} style={styles.buttonIcon}/>
                        <Text style={{...styles.textIcon, color: utilities.washingMachine}} onPress={() => iconClicked('washingMachine')}>Máy giặt</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17, 
        paddingHorizontal: 25
    },
    textIcon: {
        fontSize: 17, 
        textAlign: 'center',
    },
    buttonIcon: {
        justifyContent: 'center', 
        paddingRight: 0,
        textShadowColor: 'black',
    },
    buttonGroup: {
        paddingHorizontal: 12, 
        marginVertical: 5
    },
    input: {
        width: '77%',
        fontSize: 17,
        borderColor: 'grey',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 4,
        paddingVertical: 12,
        marginLeft: 25,
    }
});