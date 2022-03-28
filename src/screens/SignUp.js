import { StyleSheet, View, TextInput, Text, Image, Pressable, ToastAndroid, ScrollView } from 'react-native';
import React, { useState } from 'react';
import images from '../../assets/images';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const signUp = () => {
    if (email === "" || name === "" || phoneNumber === "" || password === "" || passwordConfirm === "") {
      ToastAndroid.show("Không được bỏ trống trường nào!", ToastAndroid.SHORT)
    } else if (password !== passwordConfirm) {
      ToastAndroid.show("Xác nhận mật khẩu không đúng!", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show(email + "\n" + name + "\n" + phoneNumber + "\n" + password + "\n" + passwordConfirm, ToastAndroid.SHORT)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}>
      <Image source={images.logo}></Image>
      <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={text => setEmail(text)} keyboardType="email-address"></TextInput>
      <TextInput placeholder='Họ và tên' style={styles.input} value={name} onChangeText={text => setName(text)}></TextInput>
      <TextInput placeholder='Số điện thoại' style={styles.input} value={phoneNumber} onChangeText={text => setPhoneNumber(text)} keyboardType="phone-pad"></TextInput>
      <TextInput placeholder='Mật khẩu' style={styles.input} value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
      <TextInput placeholder='Xác nhận mật khẩu' style={styles.input} value={passwordConfirm} secureTextEntry={true} onChangeText={text => setPasswordConfirm(text)}></TextInput>
      <Pressable style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
  },
  input: {
    width: '100%',
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 4,
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginVertical: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4285F4',
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
