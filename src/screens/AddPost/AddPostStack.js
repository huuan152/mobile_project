import React from "react";
import { TouchableOpacity, Text, StyleSheet, ToastAndroid } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Location from "./Location";
import Info from "./Info";
import Images from "./Images";
import Confirm from "./Confirm";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostLocationScreenSelector,
  addPostInfoScreenSelector,
  addPostImagesScreenSelector,
  addPostConfirmScreenSelector,
  addPostSelector,
  addPostThumbnailSelector,
} from "../../redux/selectors";
import myMotelApi from "../../api/myMotelApi";
import { AddPostSlice } from "./AddPostSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function AddPostStack() {
  const LocationScreen = useSelector(addPostLocationScreenSelector);
  const InfoScreen = useSelector(addPostInfoScreenSelector);
  const ImagesScreen = useSelector(addPostImagesScreenSelector);
  const ConfirmScreen = useSelector(addPostConfirmScreenSelector);
  const addPostData = useSelector(addPostSelector);
  const thumbnail = useSelector(addPostThumbnailSelector);
  const dispatch = useDispatch();

  const resetAddPost = async () => {
    dispatch(AddPostSlice.actions.resetAddPost());
    let name = await AsyncStorage.getItem("name");
    let phone = await AsyncStorage.getItem("phone");
    dispatch(
      AddPostSlice.actions.setContactName(name.substring(1, name.length - 1))
    );
    dispatch(
      AddPostSlice.actions.setContactPhone(phone.substring(1, phone.length - 1))
    );
  };

  const createMyNewMotel = async (navigation) => {
    try {
      dispatch(AddPostSlice.actions.setSendingState(true));
      let myNewMotel = {
        ...addPostData,
        rentalPrice: parseInt(addPostData.rentalPrice),
        area: parseInt(addPostData.area),
      };
      let images = [...myNewMotel.images];
      delete myNewMotel.images;
      const utilities = [];
      for (const utility in myNewMotel.utilities) {
        if (myNewMotel.utilities[utility] === BUTTON_COLORS.colorPicked) {
          utilities.push(utility);
        }
      }
      myNewMotel = {
        ...myNewMotel,
        utilities: utilities,
      };
      const motelID = await myMotelApi.myNewMotelInfo(myNewMotel);

      const data = new FormData();

      const thumbnailImg = addPostData.images[thumbnail];
      images.splice(thumbnail, 1);
      images.unshift(thumbnailImg);

      for (const image in images) {
        data.append("images", {
          name: images[image].name,
          type: images[image].mimeType,
          uri:
            Platform.OS === "ios"
              ? images[image].uri.replace("file://", "")
              : images[image].uri,
        });
      }

      await myMotelApi.myNewMotelImages(motelID, data);
      resetAddPost();
      navigation.navigate("Location");
      ToastAndroid.show("Đăng tin thành công", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show("Đã xảy ra lỗi! Thử lại sau!", ToastAndroid.SHORT);
    }
    dispatch(AddPostSlice.actions.setSendingState(false));
  };

  const nextScreen = (navigation, name) => {
    if (name === "Location" && LocationScreen) {
      navigation.navigate("Info");
    } else if (name === "Info" && InfoScreen) {
      navigation.navigate("Images");
    } else if (name === "Images" && ImagesScreen) {
      navigation.navigate("Confirm");
    } else if (name === "Confirm" && ConfirmScreen) {
      createMyNewMotel(navigation);
    } else {
      ToastAndroid.show("Vui lòng điền thông tin hợp lệ!", ToastAndroid.SHORT);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Location"
      screenOptions={{
        title: "Đăng tin",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 23,
        },
        headerTintColor: BUTTON_COLORS.colorPicked,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Location"
        component={Location}
        options={({ navigation }) => ({
          headerLeft: () => <Text></Text>,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => nextScreen(navigation, "Location")}
            >
              <Text style={{ ...styles.text, paddingRight: 25 }}>
                Tiếp theo
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ ...styles.text, paddingLeft: 25 }}>Quay lại</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => nextScreen(navigation, "Info")}>
              <Text style={{ ...styles.text, paddingRight: 25 }}>
                Tiếp theo
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Images"
        component={Images}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ ...styles.text, paddingLeft: 25 }}>Quay lại</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => nextScreen(navigation, "Images")}>
              <Text style={{ ...styles.text, paddingRight: 25 }}>
                Tiếp theo
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ ...styles.text, paddingLeft: 25 }}>Quay lại</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => nextScreen(navigation, "Confirm")}>
              <Text style={{ ...styles.text, paddingRight: 25 }}>Đăng</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    color: BUTTON_COLORS.colorPicked,
    fontSize: 18,
  },
});
