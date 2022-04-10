import { StyleSheet, View, TextInput, Text, Image, Pressable, ScrollView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import images from '../../../assets/images';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import BUTTON_COLORS from '../../Constants/Utilities/index';

const URL = "https://motel-app.herokuapp.com";
const emailRegex = /\S+@\S+\.\S+/;
const phoneNumberRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [role, setRole] = useState("lessor");

  const registerUser = async () => {
    try {
      await axios.post(`${URL}/api/user/register`, {
        "email": email,
        "password": password,
        "role": role
      });
      console.log(role);
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        ToastAndroid.show("Tài khoản đã tồn tại", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
  }

  const signUp = async () => {
    if (email === "" || name === "" || phoneNumber === "" || password === "" || passwordConfirm === "") {
      console.log("Không được bỏ trống trường nào!");
    } else if (password !== passwordConfirm) {
      console.log("Xác nhận mật khẩu không đúng!");
    } else {
      if (!emailRegex.test(email)) {
        ToastAndroid.show("Email sai định dạng!", ToastAndroid.SHORT);
      } else if (!phoneNumberRegex.test(phoneNumber)) {
        ToastAndroid.show("Số điện thoại sai định dạng!", ToastAndroid.SHORT);
      } else if (!passwordRegex.test(password)) {
        ToastAndroid.show("Mật khẩu bao gồm ít nhất 8 kí tự, trong đó có 1 chữ cái in hoa, 1 chữ cái in thường, 1 chữ số!", ToastAndroid.LONG);
      } else {
        registerUser();
      }
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
      <View style={{flexDirection: "row", alignItems: "center"}}>
        <RadioButton
          value="lessor"
          status={ role === 'lessor' ? 'checked' : 'unchecked' }
          onPress={() => setRole('lessor')}
          color={BUTTON_COLORS.colorPicked}
        />
        <Text style={{ fontSize: 17 }}>Người thuê</Text>
        <RadioButton
          value="lessee"
          status={ role === 'lessee' ? 'checked' : 'unchecked' }
          onPress={() => setRole('lessee')}
          color={BUTTON_COLORS.colorPicked}
        />
        <Text style={{ fontSize: 17 }}>Người cho thuê</Text>
      </View>
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
    backgroundColor: BUTTON_COLORS.colorPicked,
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
