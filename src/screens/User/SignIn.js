import { StyleSheet, View, TextInput, Text, Image, ScrollView, Pressable, ToastAndroid, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import images from '../../../assets/images/index';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import userApi from '../../api/userApi';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AddPostSlice } from '../AddPost/AddPostSlice';
import { UpdatePostSlice } from '../UpdatePost/UpdatePostSlice';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const logIn = async () => {
    try {
      setModalVisible(true);
      await userApi.signIn({
        "email": username,
        "password": password
      }).then(() => {
        dispatch(AddPostSlice.actions.resetPostDetail());
        dispatch(UpdatePostSlice.actions.resetPostDetail());
        nav.navigate('ContentNavigator', {screen: 'home'});
        console.log("Đăng nhập thành công!");
        ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
      });
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        ToastAndroid.show("Tài khoản hoặc mật khẩu không đúng", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
    setModalVisible(false);
  }

  const signIn = () => {
    if (username === "" || password === "") {
      ToastAndroid.show("Tài khoản hoặc mật khẩu bỏ trống!", ToastAndroid.SHORT);
    } else {
      var re = /\S+@\S+\.\S+/;
      if (re.test(username)) {
        logIn();
      } else {
        ToastAndroid.show("Tài khoản sai định dạng!", ToastAndroid.SHORT);
      }
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
        </View>
      </Modal>
      <Image source={images.logo} style={{marginBottom: 15, marginTop: 150}}></Image>
      <TextInput placeholder='Tài khoản' style={styles.input} value={username} onChangeText={text => setUsername(text)}></TextInput>
      <TextInput placeholder='Mật khẩu' style={styles.input} value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
      <Pressable>
        <Text style={styles.clickableText}>Quên mật khẩu?</Text>
      </Pressable>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
        <View style={{flex: 1, height: 1.5, backgroundColor: 'grey'}} />
        <View>
          <Text style={{width: 250, textAlign: 'center', fontSize: 17, color: "grey"}}>Hoặc đăng nhập với tài khoản</Text>
        </View>
        <View style={{flex: 1, height: 1.5, backgroundColor: 'grey'}} />
      </View>
      <View style={{flexDirection: "row", marginBottom: 20}}>
        <TouchableOpacity style={{...styles.button, backgroundColor: BUTTON_COLORS.colorPicked, flex: 1, marginRight: 10}} onPress={() => ToastAndroid.show("Tính năng đang được phát triển!", ToastAndroid.SHORT)}>
          <Image source={images.facebook} style={styles.buttonIcon}></Image>
          <Text style={styles.buttonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button, backgroundColor: "white", flex: 1}} onPress={() => ToastAndroid.show("Tính năng đang được phát triển!", ToastAndroid.SHORT)}>
          <Image source={images.google} style={styles.buttonIcon}></Image>
          <Text style={{...styles.buttonText, color: "black"}}>Google</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => nav.navigate("SignUp")}>
        <Text style={styles.clickableText}>Chưa có tài khoản? Đăng ký tại đây</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.clickableText}>Điều khoản và chính sách</Text>
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
    fontSize: 19,
    lineHeight: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonIcon: {
    marginRight: 10
  },
  clickableText: {
    fontSize: 15,
    color: BUTTON_COLORS.colorPicked,
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  }
});
