import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, ActivityIndicator, Picker } from 'react-native';
import StepBar from './StepBar';
import * as CurrentLocation from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Location() {
    const [region, setRegion] = useState('');
    const [subregion, setSubregion] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [loading, setLoading] = useState("transparent");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getCurrentLocation = async () => {
        setLoading("#4285F4");
        let { status } = await CurrentLocation.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
        let currentLocation = await CurrentLocation.getCurrentPositionAsync({accuracy: CurrentLocation.Accuracy.Highest});
        let address = await CurrentLocation.reverseGeocodeAsync(currentLocation.coords);
        setLocation(address);
        if (errorMsg) {
            console.log(errorMsg);
        }
    }

    useEffect(() => {
        if (location != null) {
            setRegion(location[0].region);
            setSubregion(location[0].subregion);
            setDistrict(location[0].district);
            setStreet(location[0].streetNumber + " " + location[0].street);
            setLoading("transparent");
        }
    },[location])

    return (
        <>
            <StepBar step={0}/>
            <View style={{ paddingHorizontal: 25, height: '100%', backgroundColor: 'white', paddingTop: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ fontSize: 17 }}>Chọn Tỉnh/TP</Text>
                    <View style={{flexDirection: 'row'}}>
                        <ActivityIndicator size="small" color={loading} style={{paddingRight: 7}} />
                        <FontAwesome.Button name="location-arrow" color={'#4285F4'} backgroundColor="transparent" underlayColor="transparent" onPress={getCurrentLocation} size={20}/>
                        <Text style={{color: '#4285F4', textAlignVertical: 'center'}} onPress={getCurrentLocation}>Vị trí hiện tại</Text>
                    </View>
                </View>
                    <TextInput placeholder='Tỉnh/TP' style={styles.input} value={region} onChangeText={text => setRegion(text)}></TextInput>
                <Text style={{ fontSize: 17 }}>Chọn Quận/Huyện</Text>
                <TextInput placeholder='Quận/Huyện' style={styles.input} value={subregion} onChangeText={text => setSubregion(text)}></TextInput>
                <Text style={{ fontSize: 17 }}>Chọn Phường/Xã</Text>
                <TextInput placeholder='Phường/Xã' style={styles.input} value={district} onChangeText={text => setDistrict(text)}></TextInput>
                <Text style={{ fontSize: 17 }}>Chọn Số nhà, tên đường</Text>
                <TextInput placeholder='Số nhà, tên đường' style={styles.input} value={street} onChangeText={text => setStreet(text)}></TextInput>
            </View>
        </>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 16,
        borderColor: 'grey',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 4,
        paddingVertical: 12,
      },
  });