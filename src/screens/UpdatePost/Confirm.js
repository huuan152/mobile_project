import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Modal,
  ActivityIndicator,
  View,
} from "react-native";
import StepBar from "./StepBar";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import { useDispatch, useSelector } from "react-redux";
import { postSelector, postSendingStateSelector } from "../../redux/selectors";
import { UpdatePostSlice } from "./UpdatePostSlice";

export default function Confirm() {
  const dispatch = useDispatch();
  const postData = useSelector(postSelector);
  const title = postData.title;
  const contactName = postData.contactName;
  const phoneNumber = postData.contactPhone;
  const description = postData.description;
  const modalVisible = useSelector(postSendingStateSelector);
  useEffect(() => {
    if (
      title !== "" &&
      contactName !== "" &&
      phoneNumber !== "" &&
      description !== ""
    ) {
      dispatch(UpdatePostSlice.actions.confirmScreenUpdate(true));
    } else {
      dispatch(
        UpdatePostSlice.actions.setMessage("Không được để trống trường nào!")
      );
      dispatch(UpdatePostSlice.actions.confirmScreenUpdate(false));
    }
  }, [title, contactName, phoneNumber, description]);

  return (
    <>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
        </View>
      </Modal>
      <StepBar step={3} />
      <ScrollView
        style={{
          paddingHorizontal: 25,
          height: "100%",
          backgroundColor: "white",
          paddingTop: 10,
        }}
      >
        <Text style={{ fontSize: 17 }}>Tiêu đề bài đăng</Text>
        <TextInput
          placeholder="Nhập tiêu đề bài đăng"
          style={styles.input}
          value={title}
          onChangeText={(text) =>
            dispatch(UpdatePostSlice.actions.setTitle(text))
          }
        ></TextInput>
        <Text style={{ fontSize: 17 }}>Liên hệ với</Text>
        <TextInput
          placeholder="Nhập họ và tên"
          style={styles.input}
          value={contactName}
          onChangeText={(text) =>
            dispatch(UpdatePostSlice.actions.setContactName(text))
          }
        ></TextInput>
        <Text style={{ fontSize: 17 }}>Số điện thoại</Text>
        <TextInput
          placeholder="Nhập số điện thoại"
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) =>
            dispatch(UpdatePostSlice.actions.setContactPhone(text))
          }
          keyboardType="phone-pad"
        ></TextInput>
        <Text style={{ fontSize: 17 }}>Mô tả chi tiết</Text>
        <TextInput
          style={{ ...styles.input, textAlignVertical: "top" }}
          value={description}
          onChangeText={(text) =>
            dispatch(UpdatePostSlice.actions.setDescription(text))
          }
          multiline={true}
          numberOfLines={6}
        ></TextInput>
        <Text
          style={{ fontSize: 15, fontStyle: "italic", textAlign: "justify" }}
        >
          * Bằng việc tiếp tục đăng tin nghĩa là bạn đã đồng ý với{" "}
          <Text
            style={{
              color: BUTTON_COLORS.colorPicked,
              textDecorationLine: "underline",
            }}
          >
            Điều khoản và Chính sách
          </Text>{" "}
          của chúng tôi
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontSize: 16,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 4,
    paddingVertical: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});
