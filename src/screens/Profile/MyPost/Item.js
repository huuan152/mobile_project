import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import IconRec from "react-native-vector-icons/MaterialCommunityIcons";
import BUTTON_COLORS from "../../../Constants/Utilities";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import myMotelApi from "../../../api/myMotelApi";
import { UpdatePostSlice } from "../../UpdatePost/UpdatePostSlice";

const testImage = "https://picsum.photos/id/11/200/300";

const Item = (props) => {
  const { rentalPrice, address, area, title } = props;
  const nav = useNavigation();

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const ViewPost = () => {
    let motelDetail = { ...props };
    delete motelDetail["_id"];
    dispatch(UpdatePostSlice.actions.updatePostDetail(motelDetail));
    setModalVisible(false);
    nav.navigate("MyPostDetail");
  };

  const UpdatePost = () => {
    let motelDetail = { ...props };
    dispatch(UpdatePostSlice.actions.updatePostDetail(motelDetail));
    setModalVisible(false);
    nav.navigate("UpdatePostStack");
  };

  const DeletePost = () => {
    Alert.alert(
      "Xóa bài đăng",
      "Bạn có chắc chắn muốn xóa bài đăng này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              dispatch(UpdatePostSlice.actions.setSendingState(true));
              setModalVisible(false);
              await myMotelApi.deleteMyMotel(props._id);
              dispatch(UpdatePostSlice.actions.deleteMotels());
            } catch (e) {
              console.log(e.message);
            }
          },
        },
      ]
    );
  };

  const formatPrice = () => {
    let price = rentalPrice;
    if (price < 10000) {
      price = price.toString() + " đồng";
    } else if (10000 <= price && price < 1000000) {
      price = price.toString().substring(0, price.toString().length - 3);
      price = parseInt(price, 10);
      price = price.toString() + " nghìn";
    } else if (1000000 <= price && price < 1000000000) {
      price = price.toString().substring(0, price.toString().length - 5);
      price = parseInt(price, 10);
      price /= 10;
      price = price.toString() + " triệu";
    } else if (price >= 1000000000) {
      price = price.toString().substring(0, price.toString().length - 8);
      price = parseInt(price, 10);
      price /= 10;
      price = price.toString() + " tỷ";
    }
    return price;
  };

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => ViewPost()}
              style={{ ...styles.options, paddingBottom: 25 }}
            >
              <FontAwesome
                name="eye"
                color={BUTTON_COLORS.colorPicked}
                backgroundColor="transparent"
                underlayColor="transparent"
                size={20}
                style={styles.buttonIcon}
              />
              <Text
                style={{ color: BUTTON_COLORS.colorPicked, flexBasis: "25%" }}
              >
                Xem
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: BUTTON_COLORS.colorBasic,
              }}
            ></View>
            <TouchableOpacity
              onPress={() => UpdatePost()}
              style={{ ...styles.options, paddingBottom: 25 }}
            >
              <FontAwesome
                name="edit"
                color={BUTTON_COLORS.colorPicked}
                backgroundColor="transparent"
                underlayColor="transparent"
                size={20}
                style={styles.buttonIcon}
              />
              <Text
                style={{ color: BUTTON_COLORS.colorPicked, flexBasis: "25%" }}
              >
                Sửa
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: BUTTON_COLORS.colorBasic,
              }}
            ></View>
            <TouchableOpacity
              onPress={() => DeletePost()}
              style={styles.options}
            >
              <FontAwesome
                name="trash"
                color={"red"}
                backgroundColor="transparent"
                underlayColor="transparent"
                size={20}
                style={styles.buttonIcon}
              />
              <Text style={{ color: "red", flexBasis: "25%" }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
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
