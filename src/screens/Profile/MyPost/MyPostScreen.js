import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import Item from "./Item";
import BUTTON_COLORS from "../../../Constants/Utilities/index";
import myMotelApi from "../../../api/myMotelApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  isDeleted,
  isUpdated,
  postSendingStateSelector,
} from "../../../redux/selectors";
import { UpdatePostSlice } from "../../UpdatePost/UpdatePostSlice";

const MyPostScreen = () => {
  const [data, setData] = useState([]);
  const modalVisible = useSelector(postSendingStateSelector);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      dispatch(UpdatePostSlice.actions.setSendingState(true));
      await myMotelApi.getAllMyMotels().then((response) => {
        let motels = response;
        for (const motel in motels) {
          delete motels[motel]["__v"];
          //delete motels[motel]["_id"]
          delete motels[motel]["censored"];
          delete motels[motel]["createdAt"];
          delete motels[motel]["owner"];
          delete motels[motel]["rate"];
          delete motels[motel]["updatedAt"];
          delete motels[motel]["zoomType"];
          let color = {
            wifi: BUTTON_COLORS.colorBasic,
            toilet: BUTTON_COLORS.colorBasic,
            motorcycle: BUTTON_COLORS.colorBasic,
            clock: BUTTON_COLORS.colorBasic,
            food: BUTTON_COLORS.colorBasic,
            "air-conditioner": BUTTON_COLORS.colorBasic,
            "ice-cream": BUTTON_COLORS.colorBasic,
            "washing-machine": BUTTON_COLORS.colorBasic,
          };
          for (const utility in motels[motel]["utilities"]) {
            color[motels[motel]["utilities"][utility]] =
              BUTTON_COLORS.colorPicked;
          }
          motels[motel]["utilities"] = color;
        }
        setData(motels);
      });
      dispatch(UpdatePostSlice.actions.setSendingState(false));
    } catch (e) {
      console.log(e.message);
    }
  }, [useSelector(isDeleted), useSelector(isUpdated)]);

  const number = Array.from(Array(data.length).keys());

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      //showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
        </View>
      </Modal>
      <View></View>
      <View style={styles.list}>
        {number.map((element, index) => {
          return <Item {...data[index]} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //paddingTop: 24,
    backgroundColor: "white",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  headerField: {
    paddingTop: 24,
    paddingBottom: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    borderBottomColor: "#bdbdbd",
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 18,
    color: BUTTON_COLORS.colorPicked,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});

export default MyPostScreen;
