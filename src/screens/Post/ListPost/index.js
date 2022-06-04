import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
  Platform,
} from "react-native";
import Post from "../../../Components/SinglePostForList";
import BUTTON_COLORS from "../../../Constants/Utilities/index";
import myMotelApi from "../../../api/myMotelApi";
import { useDispatch } from "react-redux";
import { postSlice } from "../../../redux/slice/postSlice";

const ListPost = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await myMotelApi.getAllMotels().then((response) => {
        let motels = response;
        for (const motel in motels) {
          // delete motels[motel]["__v"];
          // //delete motels[motel]["_id"]
          // delete motels[motel]["censored"];
          // delete motels[motel]["createdAt"];
          // delete motels[motel]["owner"];
          // delete motels[motel]["rate"];
          // delete motels[motel]["updatedAt"];
          // delete motels[motel]["zoomType"];
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
          let imgs = motels[motel].images;
          let thumbnail = motels[motel].thumbnail;
          if (imgs.length !== 1) {
            for (const image in imgs) {
              if (imgs[image]._id === thumbnail) {
                let img = imgs[image];
                imgs.splice(parseInt(image), 1);
                imgs.unshift(img);
                break;
              }
            }
          }
          motels[motel].images = imgs;
        }
        setData(motels);
        dispatch(postSlice.actions.getListPost(motels));
      });
    } catch (e) {
      console.log(e.message);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  const number = Array.from(Array(data.length).keys());

  return (
    <ScrollView
      style={styles.listPostContainer}
      refreshControl={
        Platform.OS !== "ios" ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[BUTTON_COLORS.colorPicked]}
          />
        ) : (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={BUTTON_COLORS.colorPicked}
          />
        )
      }
    >
      <View style={styles.container}>
        <Text style={styles.appName}>{"Tìm nhà trọ"}</Text>
        <View style={styles.row1}>
          {number.map((element, index) => {
            return (
              <Post
                key={index}
                isOdd={index % 2 === 1 ? true : false}
                {...data[index]}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listPostContainer: {
    marginTop: 36,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row1: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  appName: {
    fontSize: 32,
    color: BUTTON_COLORS.colorPicked,
    fontWeight: "bold",
    marginLeft: 12,
  },
  // titleField: {
  //     display: 'flex',
  //     flexDirection: 'row',
  //     justifyContent: 'space-between'
  // },
  addPostButton: {
    marginRight: 18,
  },
});

export default ListPost;
