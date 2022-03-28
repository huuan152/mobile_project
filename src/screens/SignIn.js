import { StyleSheet, View, TextInput, Text, Image, ToastAndroid, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import images from '../../assets/images/index';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    if (username === "" || password === "") {
      ToastAndroid.show("Tài khoản hoặc mật khẩu bỏ trống!", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show(username + "\n" + password, ToastAndroid.SHORT)
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', justifyContent: 'center',}}>
      <Image source={images.logo} style={{marginBottom: 5}}></Image>
      <TextInput placeholder='Tài khoản' style={styles.input} value={username} onChangeText={text => setUsername(text)}></TextInput>
      <TextInput placeholder='Mật khẩu' style={styles.input} value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}></TextInput>
      <Pressable style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.clickableText}>Quên mật khẩu?</Text>
      </Pressable>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1.5, backgroundColor: 'grey'}} />
        <View>
          <Text style={{width: 250, textAlign: 'center', fontSize: 17, color: "grey"}}>Hoặc đăng nhập với tài khoản</Text>
        </View>
        <View style={{flex: 1, height: 1.5, backgroundColor: 'grey'}} />
      </View>
      <View style={{flexDirection: "row"}}>
        <Pressable style={{...styles.button, backgroundColor: "#4267B2", flex: 1, marginRight: 10}} onPress={signIn}>
          <Image source={images.facebook} style={styles.buttonIcon}></Image>
          <Text style={styles.buttonText}>Facebook</Text>
        </Pressable>
        <Pressable style={{...styles.button, backgroundColor: "#2196f3", flex: 1}} onPress={signIn}>
          <Image source={images.zalo} style={styles.buttonIcon}></Image>
          <Text style={styles.buttonText}>Zalo</Text>
        </Pressable>
      </View>
      <Pressable style={{...styles.button, backgroundColor: "white", width: "100%", marginTop: 0}} onPress={signIn}>
        <Image source={images.google} style={styles.buttonIcon}></Image>
        <Text style={{...styles.buttonText, color: "black"}}>Google</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignUp")}>
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
  buttonIcon: {
    marginRight: 15
  },
  clickableText: {
    fontSize: 17,
    color: '#4285F4',
    paddingBottom: 15,
  },
});
