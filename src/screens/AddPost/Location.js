import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import StepBar from "./StepBar";
import * as CurrentLocation from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPostSelector, addPostSearchSelector } from "../../redux/selectors";
import { AddPostSlice } from "./AddPostSlice";
import { debounce } from "lodash";

export default function Location() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("transparent");
  const location = useSelector(addPostSelector).address;
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState([]);
  const search = useSelector(addPostSearchSelector);

  const getCurrentLocation = async () => {
    setLoading(BUTTON_COLORS.colorPicked);
    let { status } = await CurrentLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let currentLocation = await CurrentLocation.getCurrentPositionAsync({
      accuracy: CurrentLocation.Accuracy.Highest,
    });
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=AIzaSyBlVNkuwYlvdnVHJ587cal6v_lFUNp_5Hk`
      )
      .then(function (response) {
        dispatch(AddPostSlice.actions.locationScreenUpdate(true));
        dispatch(
          AddPostSlice.actions.setLocation(
            response.data.results[0].formatted_address
          )
        );
        dispatch(
          AddPostSlice.actions.setSearch(
            response.data.results[0].formatted_address
          )
        );
        setLoading("transparent");
      })
      .catch(function (error) {
        console.log(error);
      });
    if (errorMsg) {
      console.log(errorMsg);
    }
  };

  const searchLocation = async (input) => {
    if (input != "") {
      var newItems = [];
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=vi&components=country:vn&types=address&key=AIzaSyBlVNkuwYlvdnVHJ587cal6v_lFUNp_5Hk`
        )
        .then(function (response) {
          console.log("response.data.predictions", response.data);
          response.data.predictions.forEach((element, index) => {
            newItems.push(element.description);
          });
          setData(newItems);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setData([]);
    }
  };

  const debounceLocation = useCallback(
    debounce((input) => searchLocation(input), 1000),
    []
  );

  const changeLocation = (input) => {
    dispatch(AddPostSlice.actions.setSearch(input));
    debounceLocation(input);
  };

  useEffect(() => {
    if (search === location && search !== "") {
      dispatch(AddPostSlice.actions.locationScreenUpdate(true));
    } else {
      dispatch(AddPostSlice.actions.locationScreenUpdate(false));
    }
  }, [search]);

  const ItemClicked = (item) => {
    dispatch(AddPostSlice.actions.setLocation(item));
    dispatch(AddPostSlice.actions.setSearch(item));
    setData([]);
    //searchLocation(item);
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

  return (
    <>
      <StepBar step={0} />
      <View
        style={{
          paddingHorizontal: 25,
          height: "100%",
          backgroundColor: "white",
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 17 }}>Địa chỉ</Text>
          <View style={{ flexDirection: "row" }}>
            <ActivityIndicator
              size="small"
              color={loading}
              style={{ paddingRight: 7 }}
            />
            <FontAwesome.Button
              name="location-arrow"
              color={BUTTON_COLORS.colorPicked}
              backgroundColor="transparent"
              underlayColor="transparent"
              onPress={getCurrentLocation}
              size={20}
            />
            <Text
              style={{
                color: BUTTON_COLORS.colorPicked,
                textAlignVertical: "center",
              }}
              onPress={getCurrentLocation}
            >
              Vị trí hiện tại
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            value={search}
            placeholder="Tìm kiếm"
            underlineColorAndroid="transparent"
            onChangeText={(text) => changeLocation(text)}
          ></TextInput>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          ></FlatList>
        </View>
      </View>
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
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  itemStyle: {
    padding: 10,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: BUTTON_COLORS.colorBasic,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
