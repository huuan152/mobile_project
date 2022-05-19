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
  postLocationScreenSelector,
  postInfoScreenSelector,
  postImagesScreenSelector,
  postConfirmScreenSelector,
  postSelector,
  postThumbnailSelector,
  motelUpdateID,
} from "../../redux/selectors";
import myMotelApi from "../../api/myMotelApi";
import { useNavigation } from "@react-navigation/native";
import { UpdatePostSlice } from "./UpdatePostSlice";

const Stack = createStackNavigator();

export default function UpdatePostStack() {
  const LocationScreen = useSelector(postLocationScreenSelector);
  const InfoScreen = useSelector(postInfoScreenSelector);
  const ImagesScreen = useSelector(postImagesScreenSelector);
  const ConfirmScreen = useSelector(postConfirmScreenSelector);
  const PostData = useSelector(postSelector);
  const motelID = useSelector(motelUpdateID);
  const nav = useNavigation();
  const thumbnail = useSelector(postThumbnailSelector);
  const dispatch = useDispatch();

  const updateMyMotelInfo = async () => {
    try {
      dispatch(UpdatePostSlice.actions.setSendingState(true));

      let myNewMotel = {
        ...PostData,
        rentalPrice: parseInt(PostData.rentalPrice),
        area: parseInt(PostData.area),
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
      await myMotelApi.editMyMotelInfo(myNewMotel, motelID);
      const data = new FormData();

      const thumbnailImg = PostData.images[thumbnail];
      images.splice(thumbnail, 1);
      images.unshift(thumbnailImg);

      for (const image in images) {
        let path = images[image].uri ? images[image].uri : images[image].url;
        if (images[image].uri) {
          data.append("images", {
            uri: Platform.OS === "ios" ? path.replace("file://", "") : path,
          });
        } else {
          data.append("images", {
            url: Platform.OS === "ios" ? path.replace("file://", "") : path,
          });
        }
      }
      console.log("bef upload", data);
      await myMotelApi.myNewMotelImages(motelID, data);
      dispatch(UpdatePostSlice.actions.updateMotels());
      nav.navigate("MyPostScreen");
      ToastAndroid.show("Cập nhật thành công!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show("Đã xảy ra lỗi! Thử lại sau!", ToastAndroid.SHORT);
    }
    dispatch(UpdatePostSlice.actions.setSendingState(false));
  };

  const nextScreen = (navigation, name) => {
    if (name === "Location" && LocationScreen) {
      navigation.navigate("Info");
    } else if (name === "Info" && InfoScreen) {
      navigation.navigate("Images");
    } else if (name === "Images" && ImagesScreen) {
      navigation.navigate("Confirm");
    } else if (name === "Confirm" && ConfirmScreen) {
      updateMyMotelInfo();
    } else {
      ToastAndroid.show("Vui lòng điền thông tin hợp lệ!", ToastAndroid.SHORT);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Location"
      screenOptions={{
        title: "Sửa tin",
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ ...styles.text, paddingLeft: 25 }}>Quay lại</Text>
            </TouchableOpacity>
          ),
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
