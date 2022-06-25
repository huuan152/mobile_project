import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  ActivityIndicator,
  Modal,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import BUTTON_COLORS from "../../../Constants/Utilities/index";
import District from "../../../Constants/Areas/quan_huyen.json";
import SubDistrict from "../../../Constants/Areas/xa_phuong.json";
import { useDispatch, useSelector } from "react-redux";
import { postSlice } from "../../../redux/slice/postSlice";
import { useNavigation } from "@react-navigation/native";
import userApi from "../../../api/userApi";
import { userSelector } from "../../../redux/selectors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AreaTrackingScreen = (props) => {
  const [search, setSearch] = useState("");
  const [area, setArea] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { user } = useSelector(userSelector);
  console.log("Current user", user);
  const searchArea = (input) => {
    setSearch(input);
    var result = [];
    if (input !== "") {
      var enoughData = false;
      // if (area.length === 0) {
      //   result.push("Thành phố Hà Nội");
      // } else if (area[0] === "Thành phố Hà Nội") {
      //   enoughData = true;
      //   return false;
      // }
      if (enoughData === false) {
        District.every((item) => {
          if (result.length > 10) {
            enoughData = true;
            return false;
          }
          if (item.name.startsWith(input)) {
            area.includes(item.path);
            if (!area.includes(item.path)) {
              result.push(item.path);
            }
          }
          return true;
        });
      }
      if (enoughData === false) {
        SubDistrict.every((item) => {
          if (result.length > 10) {
            return false;
          }
          if (result.length < 10 && item.name.startsWith(input)) {
            if (!area.includes(item.path)) {
              result.push(item.path);
            }
          }
          return true;
        });
      }
    }
    setData(result);
  };

  const onPressTrackingArea = (item) => {
    const list = District.concat(SubDistrict);
    const searchLocationText = list.find((element) => element.path === item);
    if (searchLocationText) {
      dispatch(
        postSlice.actions.getLocationSearchPost(searchLocationText.name)
      );
    }
    nav.navigate("Search Tab");
  };

  const ItemClicked = async (item) => {
    // setArea([...area, item]);
    // await userApi.updateMyFavoriteAreas({
    //   favoriteAreas: [...area, item],
    // });
    // setSearch("");
    // setData([]);
    setLoading(true);
    try {
      await userApi
        .updateMyFavoriteAreas({
          favoriteAreas: [...area, item],
        })
        .then((response) => {
          console.log("This is the response", response);
          setArea(response.favoriteAreas);
          AsyncStorage.setItem(
            "favoriteAreas",
            JSON.stringify(response.favoriteAreas)
          );
          setSearch("");
          setData([]);
        });
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const deleteArea = (item) => {
    Alert.alert(
      "Hủy theo dõi khu vực",
      "Bạn có chắc chắn muốn hủy theo dõi khu vực này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            const newAreas = [];
            for (const location of area) {
              if (location !== item) {
                newAreas.push(location);
              }
            }
            setLoading(true);
            try {
              await userApi
                .updateMyFavoriteAreas({
                  favoriteAreas: newAreas,
                })
                .then((response) => {
                  console.log("This is the user after delete", response);
                  AsyncStorage.setItem(
                    "favoriteAreas",
                    JSON.stringify(response.favoriteAreas)
                  );
                  setArea(response.favoriteAreas);
                });
            } catch (e) {
              console.log(e.message);
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  useEffect(() => {
    const getFavoriteAreas = async () => {
      const response = await userApi.getCurrentUserInfo();
      console.log("User favorite areas", response);
      setArea(response.favoriteAreas);
    };
    getFavoriteAreas();
  }, []);

  const ItemViewSearch = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => ItemClicked(item)}>
        <Text style={styles.itemStyle}>{`${item}`}</Text>
      </TouchableOpacity>
    );
  };

  const ItemView = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressTrackingArea(item)}
        style={styles.itemField}
      >
        <Text style={styles.itemStyle}>{`${index + 1}. ${item}`}</Text>
        <Pressable onPress={() => deleteArea(item)}>
          <IconAntDesign
            size={24}
            color="#c93c3c"
            name="closecircle"
          ></IconAntDesign>
        </Pressable>
      </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 24 }}>
        <Text style={styles.inputTitle}>Theo dõi khu vực</Text>
        <View style={styles.inputArea}>
          <TextInput
            placeholder="Nhập khu vực muốn theo dõi"
            style={styles.input}
            value={search}
            onChangeText={(text) => searchArea(text)}
          ></TextInput>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemViewSearch}
        ></FlatList>
        {area.length !== 0 && data.length === 0 && (
          <View style={{ marginVertical: 15 }}>
            <Text style={styles.inputTitle}>Khu vực được theo dõi</Text>
            <FlatList
              data={area}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={(item, index) => ItemView(item, index)}
            ></FlatList>
          </View>
        )}
      </View>
      <Modal animationType="none" transparent={true} visible={loading}>
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color={BUTTON_COLORS.colorPicked} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  priceField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 9,
    marginBottom: 12,
  },
  inputArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: "#c7c8c9",
    width: "100%",
  },
  itemStyle: {
    padding: 10,
    //backgroundColor: "#c7c8c9",
    borderRadius: 4,
  },
  itemField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#719fd1",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BUTTON_COLORS.colorBasic,
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});

export default AreaTrackingScreen;
