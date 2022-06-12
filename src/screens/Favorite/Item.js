import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import IconRec from "react-native-vector-icons/MaterialCommunityIcons";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import myMotelApi from "../../api/myMotelApi";
import { UpdatePostSlice } from "../UpdatePost/UpdatePostSlice";

const testImage = "https://picsum.photos/id/11/200/300";

const Item = (props) => {
  const { rentalPrice, address, area, title } = props;
  const nav = useNavigation();

  const dispatch = useDispatch();

  const ViewPost = () => {
    let motelDetail = { ...props };
    dispatch(UpdatePostSlice.actions.updatePostDetail(motelDetail));
    nav.navigate("MyPostDetail");
  };

  const formatPrice = () => {
    let price = rentalPrice;
    if (price < 1000000) {
      price = price.toString().substring(0, price.toString().length - 3);
      price = parseInt(price);
      price = price.toString() + " nghìn";
    } else {
      price = price.toString().substring(0, price.toString().length - 5);
      price = parseInt(price);
      price /= 10;
      price = price.toString() + " triệu";
    }
    return price;
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => ViewPost()}>
        <View style={styles.content}>
          <View style={styles.imageField}>
            <Text style={styles.price}>{formatPrice()}</Text>
            <Image
              source={{
                uri:
                  props.images[0] === undefined
                    ? testImage
                    : props.images[0].url,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoField}>
            <View style={styles.titleField}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.addressField}>
              <Icon
                size={16}
                color={BUTTON_COLORS.colorPicked}
                name="location"
              />
              <Text style={styles.addressText}>{address}</Text>
            </View>
            <View style={styles.areaField}>
              <IconRec
                size={16}
                color={BUTTON_COLORS.colorPicked}
                name="vector-rectangle"
              />
              <Text style={styles.addressText}>{`${area} m2`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
  },
  content: {
    flexDirection: "row",
  },
  imageField: {
    flex: 2,
    padding: 12,
  },
  image: {
    width: "100%",
    height: 140,
  },
  infoField: {
    flex: 5,
    marginTop: 10,
    marginRight: 36,
  },
  price: {
    marginBottom: -29,
    paddingVertical: 5,
    paddingHorizontal: 2,
    textAlign: "center",
    backgroundColor: BUTTON_COLORS.colorPicked,
    width: "100%",
    color: "#ffffff",
    zIndex: 99,
  },
  title: {
    color: BUTTON_COLORS.colorPicked,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  addressField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  areaField: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressText: {
    marginLeft: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonIcon: {
    textShadowColor: "black",
    flexBasis: "25%",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Item;
