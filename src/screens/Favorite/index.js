import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Platform,
  Text
} from "react-native";
import Item from "./Item";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import userApi from "../../api/userApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  isToggled,
  userSendingStateSelector,
} from "../../redux/selectors";
import { userSlice } from "../../redux/slice/userSlice";

const Favorite = () => {
  const [data, setData] = useState([]);
  const modalVisible = useSelector(userSendingStateSelector);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async (refresh) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        dispatch(userSlice.actions.setSendingState(true));
      }
      await userApi.getAllMyFavoriteMotels().then((response) => {
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
        dispatch(userSlice.actions.updateFavoriteMotels(motels));
      });
    } catch (e) {
      console.log(e.message);
    }
    if (refresh) {
      setRefreshing(false);
    } else {
      dispatch(userSlice.actions.setSendingState(false));
    }
  };

  useEffect(() => {
    // params === false: fetch data after update motels
    fetchData(false);
  }, []);

  const number = Array.from(Array(data.length).keys());

  return (
    <View style={styles.container}>
        <View style={styles.headerField}>
            <Text style={styles.header}>{`Yêu thích`}</Text>
        </View>
        <ScrollView
        stickyHeaderIndices={[0]}
        //showsVerticalScrollIndicator={false}
        style={styles.scroll}
        refreshControl={
            Platform.OS !== "ios" ? (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchData(true)}
                colors={[BUTTON_COLORS.colorPicked]}
            />
            ) : (
            <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchData(true)}
                tintColor={BUTTON_COLORS.colorPicked}
            />
            )
        }
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
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    //paddingTop: 24,
    backgroundColor: "white",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  container: {
    flex: 1
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
  container: {
    flex: 1
    },
    headerField: {
        paddingTop: 24,
        paddingBottom: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor: '#bdbdbd',
        borderBottomWidth: 1
    },
    header: {
        fontSize: 18,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: 'bold'
    },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});

export default Favorite;
