import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import IconRec from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePostSlice } from "../../screens/UpdatePost/UpdatePostSlice";

//import { styles } from './style';

const testImage = "https://picsum.photos/id/11/200/300";

const Post = (props) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { rentalPrice, address, area, isOdd, favoritePage } = props;

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

  const viewPostDetail = () => {
    dispatch(UpdatePostSlice.actions.updatePostDetail(props));
    nav.navigate("Post");
  };

  return (
    <TouchableOpacity
      style={styles.containerForHomePage}
      onPress={() => viewPostDetail()}
    >
      <View style={isOdd ? styles.oddCard : styles.evenCard}>
        <View style={styles.imageField}>
          <Image
            source={{
              uri:
                props.images[0] === undefined ? testImage : props.images[0].url,
            }}
            style={styles.image}
          />
          <Text style={styles.price}>{formatPrice()}</Text>
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          <View style={styles.addressField}>
            <Icon size={16} color={BUTTON_COLORS.colorPicked} name="location" />
            <Text style={styles.addressText} numberOfLines={2}>
              {address}
            </Text>
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
  );
};

const styles = StyleSheet.create({
  containerForHomePage: {
    flexBasis: "50%",
    marginBottom: 8,
  },
  evenCard: {
    marginLeft: 8,
    marginRight: 3,
  },
  oddCard: {
    marginRight: 8,
    marginLeft: 3,
  },
  imageField: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: 140,
  },
  price: {
    marginTop: -31,
    paddingVertical: 6,
    textAlign: "center",
    backgroundColor: BUTTON_COLORS.colorPicked,
    width: "50%",
    color: "#ffffff",
  },
  addressText: {
    paddingLeft: 5,
    width: "90%",
  },
  addressField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  areaField: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
export default Post;
