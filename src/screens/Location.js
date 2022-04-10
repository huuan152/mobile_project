import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, ActivityIndicator } from 'react-native';
import StepBar from './StepBar';
import * as CurrentLocation from 'expo-location';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BUTTON_COLORS from '../Constants/Utilities/index';
import axios from 'axios';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function Location() {
    // const arr = ["An", "Anh", "Chính", "Hải", "Tân", "Đức"];
    const [loading, setLoading] = useState("transparent");
    const [location, setLocation] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const [selectedItems, setSelectedItems] = useState({});

    const [items, setItems] = useState([]);

    const getCurrentLocation = async () => {
        setLoading(BUTTON_COLORS.colorPicked);
        let { status } = await CurrentLocation.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    
        let currentLocation = await CurrentLocation.getCurrentPositionAsync({accuracy: CurrentLocation.Accuracy.Highest});
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ`)
        .then(function (response) {
            setLocation(response.data.results[0].formatted_address);
        })
        .catch (function (error) { 
            console.log(error);
        });
        if (errorMsg) {
            console.log(errorMsg);
        }
    }

    useEffect(() => {
        if (location != null) {
            setLoading("transparent");
        }
    },[location])

    const searchLocation = async(input) => {
        var newItems = [];    
        await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=vi&components=country:vn&types=geocode&key=AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ`)
        .then(function (response) {
            console.log(response);
            response.data.predictions.forEach((element, index) => {
                console.log(element.description);
                 newItems.push({
                     id: index,
                     name: element
                 })
            })
            setItems(newItems);
        })
        .catch (function (error) { 
            console.log(error);
        });
    }

    // const searchLocation = (input) => {
    //     var newItems = [];
    //     arr.forEach((element, index) => {
    //         newItems.push({
    //             id: index,
    //             name: element
    //         })
    //     })
    //     console.log("searchLocation");
    //     console.log(newItems);
    //     setItems(newItems);
    // }

    useEffect(() => {
        console.log("useEffect");
        console.log(items);
    },[items]);

    
    return (
        <>
            <StepBar step={0}/>
            <View style={{ paddingHorizontal: 25, height: '100%', backgroundColor: 'white', paddingTop: 15}}>
                 <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5}}>
                     <Text style={{ fontSize: 17 }}>{location}</Text>
                     <View style={{flexDirection: 'row'}}>
                         <ActivityIndicator size="small" color={loading} style={{paddingRight: 7}} />
                         <FontAwesome.Button name="location-arrow" color={BUTTON_COLORS.colorPicked} backgroundColor="transparent" underlayColor="transparent" onPress={getCurrentLocation} size={20}/>
                         <Text style={{color: BUTTON_COLORS.colorPicked, textAlignVertical: 'center'}} onPress={getCurrentLocation}>Vị trí hiện tại</Text>
                     </View>
                 </View>
                 <SearchableDropdown
                     selectedItems={selectedItems}
                     onItemSelect={(item) => {
                         setSelectedItems(item);
                         console.log(item);
                     }}
                     containerStyle={{ padding: 5 }}
                     itemStyle={{
                         padding: 10,
                         backgroundColor: 'white',
                         borderColor: BUTTON_COLORS.colorBasic,
                         borderWidth: 1,
                         borderRadius: 5,
                     }}
                     itemTextStyle={{ color: 'black' }}
                     items={items}
                     textInputProps={{
                         placeholder: "Tìm kiếm",
                         underlineColorAndroid: "transparent",
                         style: {
                             padding: 12,
                             borderWidth: 1,
                             borderColor: BUTTON_COLORS.colorBasic,
                             borderRadius: 5,
                         },
                         onTextChange: text => searchLocation(text)
                     }}
                        listProps={{
                         nestedScrollEnabled: true,
                    }}
                 />
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
      container: {
        flex: 1,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
      },
  });