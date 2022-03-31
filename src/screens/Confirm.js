import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, ScrollView } from 'react-native';

export default function Confirm() {
    const [title, setTitle] = useState('');
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
  
    return (
        <ScrollView style={{ paddingHorizontal: 25 }}>
            <Text style={{ fontSize: 17 }}>Tiêu đề bài đăng</Text>
            <TextInput placeholder='Nhập tiêu đề bài đăng' style={styles.input} value={title} onChangeText={text => setTitle(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Liên hệ với</Text>
            <TextInput placeholder='Nhập họ và tên' style={styles.input} value={contactName} onChangeText={text => setContactName(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Số điện thoại</Text>
            <TextInput placeholder='Nhập số điện thoại' style={styles.input} value={phoneNumber} onChangeText={text => setPhoneNumber(text)}></TextInput>
            <Text style={{ fontSize: 17 }}>Mô tả chi tiết</Text>
            <TextInput style={{...styles.input, textAlignVertical: 'top'}} value={description} onChangeText={text => setDescription(text)} multiline = {true} numberOfLines = {6}></TextInput>
            <Text style={{ fontSize: 17, fontStyle: 'italic' , textAlign: "justify"}}>* Bằng việc tiếp tục đăng tin nghĩa là bạn đã đồng ý với <Text style={{color: "#4285F4", textDecorationLine: 'underline'}}>Điều khoản và Chính sách</Text> của chúng tôi</Text>
        </ScrollView>
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