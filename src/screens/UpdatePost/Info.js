import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, ScrollView } from "react-native";
import { ButtonGroup } from "react-native-elements";
import StepBar from "./StepBar";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import Utilities from "../../Components/UtilitiesButton/index";
import { useDispatch, useSelector } from "react-redux";
import { postSelector } from "../../redux/selectors";
import { UpdatePostSlice } from "./UpdatePostSlice";

const postTypes = ["Cho thuê", "Tìm người ở ghép"];
const roomTypes = ["Phòng", "Căn hộ", "Căn hộ mini", "Nguyên căn"];
const utilities = [
  "wifi",
  "toilet",
  "motorcycle",
  "clock",
  "food",
  "air-conditioner",
  "ice-cream",
  "washing-machine",
];

export default function Info() {
  const dispatch = useDispatch();
  const postData = useSelector(postSelector);
  const post = parseInt(postData.postType);
  const room = postData.roomType;
  const roomPrice = postData.rentalPrice.toString();
  const area = postData.area.toString();
  const utilitiesColor = useSelector(postSelector).utilities;

  const countSelectedUtilities = () => {
    let count = 0;
    for (const utility in utilitiesColor) {
      if (utilitiesColor[utility] === BUTTON_COLORS.colorPicked) {
        count++;
      }
    }
    return count;
  };

  useEffect(() => {
    if (
      roomPrice !== "" &&
      area !== "" &&
      parseInt(roomPrice) !== 0 &&
      parseInt(area) !== 0
    ) {
      dispatch(UpdatePostSlice.actions.infoScreenUpdate(true));
    } else {
      dispatch(
        UpdatePostSlice.actions.setMessage(
          "Giá phòng hoặc diện tích phải khác 0!"
        )
      );
      dispatch(UpdatePostSlice.actions.infoScreenUpdate(false));
    }
  }, [roomPrice, area, room, post]);

  return (
    <>
      <StepBar step={1} />
      <ScrollView
        style={{ height: "100%", backgroundColor: "white", paddingTop: 15 }}
      >
        <Text style={styles.text}>Loại tin</Text>
        <View style={styles.buttonGroup}>
          <ButtonGroup
            buttons={postTypes}
            selectedIndex={post}
            onPress={(value) =>
              dispatch(UpdatePostSlice.actions.setPostType(value))
            }
            textStyle={{ fontSize: 15, fontWeight: "bold" }}
          />
        </View>
        <Text style={styles.text}>Loại phòng</Text>
        <View style={styles.buttonGroup}>
          <ButtonGroup
            buttons={roomTypes}
            selectedIndex={room}
            onPress={(value) =>
              dispatch(UpdatePostSlice.actions.setRoomType(value))
            }
            textStyle={{ fontSize: 15, fontWeight: "bold" }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, paddingLeft: 25 }}>
              Giá phòng (VND)
            </Text>
            <TextInput
              placeholder="3000000"
              style={styles.input}
              value={roomPrice}
              onChangeText={(text) =>
                dispatch(UpdatePostSlice.actions.setRentalPrice(text))
              }
              keyboardType="phone-pad"
            ></TextInput>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, paddingLeft: 25 }}>
              Diện tích (m2)
            </Text>
            <TextInput
              placeholder="20"
              style={styles.input}
              value={area}
              onChangeText={(text) =>
                dispatch(UpdatePostSlice.actions.setArea(text))
              }
              keyboardType="phone-pad"
            ></TextInput>
          </View>
        </View>
        <View style={styles.utilitiesField}>
          <Text
            style={{
              ...styles.utilitiesTitle,
              color: BUTTON_COLORS.colorPicked,
            }}
          >{`Tiện ích (${countSelectedUtilities()})`}</Text>
          <View style={styles.utilities}>
            {utilities.map((element, index) => {
              return (
                <View style={styles.utilitiesItem} key={index}>
                  <Utilities
                    key={index}
                    size={45}
                    name={element}
                    iconClicked
                    addPost={false}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingHorizontal: 25,
  },
  textIcon: {
    fontSize: 15,
    textAlign: "center",
  },
  buttonIcon: {
    justifyContent: "center",
    paddingRight: 0,
    textShadowColor: "black",
  },
  buttonGroup: {
    paddingHorizontal: 12,
    marginVertical: 5,
  },
  input: {
    width: "77%",
    fontSize: 17,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 4,
    paddingVertical: 12,
    marginLeft: 25,
  },
  utilitiesField: {
    marginTop: 12,
    marginLeft: 10,
  },
  utilitiesTitle: {
    fontSize: 18,
    marginLeft: 16,
  },
  utilities: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  utilitiesItem: {
    flexBasis: "25%",
    justifyContent: "flex-end",
  },
});
