import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "../../../assets/images/index";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import userApi from "../../api/userApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AddPostSlice } from "../AddPost/AddPostSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userSlice } from "../../redux/slice/userSlice";
import { registerForPushNotificationsAsync } from "../../Components/Notifications";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  const nav = useNavigation();
  const dispatch = useDispatch();

  const logIn = async () => {
    try {
      setModalVisible(true);
      let response = await userApi.signIn({
        email: username,
        password: password,
      });
      dispatch(AddPostSlice.actions.setContactName(response.user.name));
      dispatch(AddPostSlice.actions.setContactPhone(response.user.phone));
      setModalVisible(false);
      dispatch(userSlice.actions.logInState(true));
      dispatch(userSlice.actions.logIn(response.user));
      console.log("Đăng nhập thành công!");
      ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.SHORT);
    } catch (error) {
      setModalVisible(false);
      if (error.message === "Request failed with status code 400") {
        ToastAndroid.show(
          "Tài khoản hoặc mật khẩu không đúng",
          ToastAndroid.SHORT
        );
      } else {
        console.log(error.message);
      }
    }
  };

  const validate = () => {
    if (username === "" || password === "") {
      ToastAndroid.show(
        "Tài khoản hoặc mật khẩu bỏ trống!",
        ToastAndroid.SHORT
      );
    } else {
      var re = /\S+@\S+\.\S+/;
      if (re.test(username)) {
        logIn();
      } else {
        ToastAndroid.show("Tài khoản sai định dạng!", ToastAndroid.SHORT);
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });
  }, []);

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
        style={{ marginBottom: 15, marginTop: 150 }}
      ></Image>
      <TextInput
        placeholder="Tài khoản"
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={validate}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
      <Pressable>
        <Text style={styles.clickableText}>Quên mật khẩu?</Text>
      </Pressable>
      <View style={{ marginTop: 50, flex: 1, alignItems: "center" }}>
        <View style={{ height: 1, backgroundColor: "black" }} />
        <Pressable onPress={() => nav.navigate("SignUp")}>
          <Text style={styles.clickableText}>
            Chưa có tài khoản? Đăng ký tại đây
          </Text>
        </Pressable>
        <Pressable>
          <Text style={styles.clickableText}>Điều khoản và chính sách</Text>
        </Pressable>
      </View>
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
    fontSize: 19,
    lineHeight: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonIcon: {
    marginRight: 10,
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
  },
});
