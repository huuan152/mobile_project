import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default function Location() {
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [street, setStreet] = useState('');
  
    return (
        <View style={{ paddingHorizontal: 25 }}>
            <Text style={{ fontSize: 17 }}>Chọn Tỉnh/TP</Text>
            <TextInput placeholder='Tỉnh/TP' style={styles.input} value={city} onChangeText={text => setCity(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Chọn Quận/Huyện</Text>
            <TextInput placeholder='Quận/Huyện' style={styles.input} value={district} onChangeText={text => setDistrict(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Chọn Phường/Xã</Text>
            <TextInput placeholder='Phường/Xã' style={styles.input} value={subDistrict} onChangeText={text => setSubDistrict(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Chọn Số nhà, tên đường</Text>
            <TextInput placeholder='Số nhà, tên đường' style={styles.input} value={street} onChangeText={text => setStreet(text)}></TextInput>
        </View>
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