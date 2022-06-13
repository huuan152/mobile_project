import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import District from "../../Constants/Areas/quan_huyen.json";
import SubDistrict from "../../Constants/Areas/xa_phuong.json";
import { useDispatch, useSelector } from "react-redux";
import { listPostSelector } from "../../redux/selectors";
import { postSlice } from "../../redux/slice/postSlice";
import ListPostWithAddress from "../../Components/ListPostWithAddress";
import FilterPost from "../../Components/FilterPost";
import { useIsFocused } from "@react-navigation/native";

const SeachScreen = () => {
  const dispatch = useDispatch();
  const { searchPost, locationSearchText } = useSelector(listPostSelector);
  const isFocused = useIsFocused();
  ///////////////////////////////////////
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const searchArea = (input) => {
    setSearch(input);
    var result = [];
    if (input !== "") {
      var enoughData = false;
      if (enoughData === false) {
        District.every((x) => {
          if (result.length > 10) {
            enoughData = true;
            return false;
          }
          if (x.name.startsWith(input)) {
            result.push(x.path_with_type);
          }
          return true;
        });
      }
      if (enoughData === false) {
        SubDistrict.every((x) => {
          if (result.length > 10) {
            return false;
          }
          if (result.length < 10 && x.name.startsWith(input)) {
            result.push(x.path_with_type);
          }
          return true;
        });
      }
    }
    setData(result);
  };

  const ItemClicked = (item) => {
    searchArea(item);
    const list = District.concat(SubDistrict);
    const e = list.find((e) => e.path_with_type === item);
    setLocation(e.name);
  };

  const ItemView = ({ item }) => {
    return (
      <Pressable onPress={() => ItemClicked(item)}>
        <Text style={styles.itemStyle}>{item}</Text>
      </Pressable>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: BUTTON_COLORS.colorBasic,
        }}
      ></View>
    );
  };

  const addNewAreaTracking = () => {
    setArea(search);
    setSearch("");
    if (location !== "") {
      dispatch(postSlice.actions.getLocationSearchPost(location));
    }
  };

  useEffect(() => {
    if (locationSearchText) {
      const list = District.concat(SubDistrict);
      const searchLocation = list.find(
        (element) => element.name === locationSearchText
      );
      setArea(searchLocation.path_with_type);
    }
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          style={styles.flatListStyle}
        ></FlatList>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.inputArea}>
              <TextInput
                placeholder="Nhập khu vực muốn tìm kiếm"
                style={styles.input}
                value={search}
                onChangeText={(text) => searchArea(text)}
              ></TextInput>
              <View style={{ width: 5 }}></View>
              <TouchableOpacity
                style={{
                  backgroundColor: BUTTON_COLORS.colorPicked,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={addNewAreaTracking}
              >
                <Text style={{ color: "white" }}>Tìm kiếm</Text>
              </TouchableOpacity>
            </View>
            <ListPostWithAddress title={area} data={searchPost} />
            {/* <View>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to Send Notification"
                    onPress={async () => {
                    await sendPushNotification(expoPushToken);
                    }}
                />
            </View> */}
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <FilterPost setModalVisible={setModalVisible} />
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
      {searchPost.length > 0 && (
        <View style={styles.buttonShowModalField}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>{`Lọc`}</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  container: {
    padding: 12,
    minHeight: 550,
  },
  header: {
    fontSize: 32,
    color: BUTTON_COLORS.colorPicked,
    fontWeight: "bold",
    marginLeft: 6,
  },
  searchText: {
    marginLeft: 6,
    fontSize: 16,
    marginTop: 6,
  },
  inputArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  inputTitle: {
    fontSize: 17,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: BUTTON_COLORS.colorBasic,
    borderRadius: 5,
    backgroundColor: "white",
    width: "80%",
  },
  itemStyle: {
    padding: 10,
    backgroundColor: "#cccccc",
  },
  flatListStyle: {
    zIndex: 99,
    position: "absolute",
    top: 56,
    left: 18,
    backgroundColor: "white",
    borderRadius: 12,
    minWidth: "80%",
  },
  buttonShowModalField: {
    position: "absolute",
    right: 12,
    bottom: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#223a5c",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SeachScreen;
