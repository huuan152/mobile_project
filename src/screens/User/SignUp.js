import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import images from "../../../assets/images";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import userApi from "../../api/userApi";
import { useNavigation } from "@react-navigation/native";

const emailRegex = /\S+@\S+\.\S+/;
const phoneNumberRegex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigation();

  const registerUser = async () => {
    try {
      setModalVisible(true);
      await userApi
        .signUp({
          email: email,
          password: password,
          name: name,
          phone: phoneNumber,
          role: "lessor",
        })
        .then(() => {
          console.log("Đăng ký thành công!");
          ToastAndroid.show("Đăng ký thành công!", ToastAndroid.SHORT);
          nav.navigate("SignIn");
        });
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        ToastAndroid.show("Tài khoản đã tồn tại", ToastAndroid.SHORT);
      } else {
        console.log(error.message);
      }
    }
    setModalVisible(false);
  };

  const signUp = async () => {
    if (
      email === "" ||
      name === "" ||
      phoneNumber === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      ToastAndroid.show("Không được bỏ trống trường nào!", ToastAndroid.SHORT);
    } else if (password !== passwordConfirm) {
      ToastAndroid.show("Xác nhận mật khẩu không đúng!", ToastAndroid.SHORT);
    } else {
      if (!emailRegex.test(email)) {
        ToastAndroid.show("Email sai định dạng!", ToastAndroid.SHORT);
      } else if (!phoneNumberRegex.test(phoneNumber)) {
        ToastAndroid.show("Số điện thoại sai định dạng!", ToastAndroid.SHORT);
      } else if (!passwordRegex.test(password)) {
        ToastAndroid.show(
          "Mật khẩu bao gồm ít nhất 8 kí tự, trong đó có 1 chữ cái in hoa, 1 chữ cái in thường, 1 chữ số!",
          ToastAndroid.LONG
        );
      } else {
        registerUser();
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
        </View>
      </Modal>
      <Image
        source={images.logo}
        style={{ marginBottom: 15, marginTop: 60 }}
      ></Image>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      ></TextInput>
      <TextInput
        placeholder="Họ và tên"
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      ></TextInput>
      <TextInput
        placeholder="Số điện thoại"
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      ></TextInput>
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TextInput
        placeholder="Xác nhận mật khẩu"
        style={styles.input}
        value={passwordConfirm}
        secureTextEntry={true}
        onChangeText={(text) => setPasswordConfirm(text)}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  input: {
    width: "100%",
    fontSize: 16,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 6,
    borderRadius: 4,
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});
