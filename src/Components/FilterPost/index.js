import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, TextInput } from "react-native";
import { ButtonGroup } from "react-native-elements";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { postSlice } from "../../redux/slice/postSlice";
import { listPostSelector } from "../../redux/selectors";
const FilterPost = ({ setModalVisible }) => {
  const dispatch = useDispatch();
  const { roomType, sortType, minPrice, maxPrice, minArea, maxArea } =
    useSelector(listPostSelector);
  const roomTypes = ["Phòng", "Căn hộ", "Căn hộ mini", "Nguyên căn"];
  const sortTypes = ["Mới nhất", "Giá giảm dần", "Giá tăng dần"];
  const [selectedIndexRoom, setSelectedIndexRoom] = useState(0);
  const [selectedIndexType, setSelectedIndexType] = useState(0);
  const [minPriceValue, setMinPriceValue] = useState("");
  const [maxPriceValue, setMaxPriceValue] = useState("");
  const [minAreaValue, setMinAreaValue] = useState("");
  const [maxAreaValue, setMaxAreaValue] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setSelectedIndexRoom(roomType);
    setSelectedIndexType(sortType);
    setMinPriceValue(minPrice.toString());
    setMaxPriceValue(maxPrice.toString());
    setMinAreaValue(minArea.toString());
    setMaxAreaValue(maxArea.toString());
  }, []);
  const handleFiltered = () => {
    if (validate().status) {
      const action = {
        roomType: selectedIndexRoom,
        sortType: selectedIndexType,
        minPrice: parseInt(minPriceValue),
        maxPrice: parseInt(maxPriceValue),
        minArea: parseInt(minAreaValue),
        maxArea: parseInt(maxAreaValue),
      };
      dispatch(postSlice.actions.getSearchFilteredPost(action));
    } else {
      setError(validate().message);
    }
  };
  const validate = () => {
    if (
      minPriceValue === "" ||
      maxPriceValue === "" ||
      maxAreaValue === "" ||
      minAreaValue === ""
    ) {
      return {
        status: false,
        message: `Bạn cần nhập đầy đủ các thông tin.`,
      };
    }
    return {
      status: true,
      message: ``,
    };
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <ButtonGroup
          buttons={roomTypes}
          selectedIndex={selectedIndexRoom}
          onPress={(value) => setSelectedIndexRoom(value)}
          textStyle={{ fontSize: 15, fontWeight: "bold" }}
        />
      </View>
      <View style={styles.buttonGroupType}>
        <ButtonGroup
          buttons={sortTypes}
          selectedIndex={selectedIndexType}
          onPress={(value) => setSelectedIndexType(value)}
          textStyle={{ fontSize: 15, fontWeight: "bold" }}
        />
      </View>
      <View style={styles.sliderStyle}>
        <View style={styles.titleSliderStyle}>
          <Text style={styles.sliderTitle}>{`Mức giá`}</Text>
          <View style={styles.inputField}>
            <Text style={styles.titleInput}>{`Từ`}</Text>
            <TextInput
              style={styles.inputStyle}
              value={minPriceValue}
              onChangeText={setMinPriceValue}
            />
            <Text style={styles.titleInput}>{`Đến`}</Text>
            <TextInput
              style={styles.inputStyle}
              value={maxPriceValue}
              onChangeText={setMaxPriceValue}
            />
            <Text style={styles.unit}>{`đồng`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.sliderStyle}>
        <View style={styles.titleSliderStyle}>
          <Text style={styles.sliderTitle}>{`Diện tích`}</Text>
          <View style={styles.inputField}>
            <Text style={styles.titleInput}>{`Từ`}</Text>
            <TextInput
              style={styles.inputStyle}
              sty
              value={minAreaValue}
              onChangeText={setMinAreaValue}
            />
            <Text style={styles.titleInput}>{`Đến`}</Text>
            <TextInput
              style={styles.inputStyle}
              value={maxAreaValue}
              onChangeText={setMaxAreaValue}
            />
            <Text style={styles.unit}>m2</Text>
          </View>
        </View>
      </View>
      {error !== "" && (
        <View style={styles.errorField}>
          <Text style={styles.error}>{`${error}`}</Text>
        </View>
      )}
      <View style={styles.buttonField}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.textStyle}>{`Hủy`}</Text>
        </Pressable>
        <View style={{ width: 10 }}></View>
        <Pressable
          style={[styles.button, styles.buttonFilter]}
          onPress={() => handleFiltered()}
        >
          <Text style={styles.textStyle}>{`Lọc`}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonGroup: {
    marginVertical: 5,
  },
  buttonGroupType: {
    marginVertical: 5,
  },
  sliderStyle: {
    marginVertical: 5,
  },
  titleSliderStyle: {
    flexDirection: "column",
    marginHorizontal: 12,
    alignItems: "flex-start",
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4f5157",
    marginRight: 24,
    marginBottom: 10,
  },
  buttonField: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 30,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonFilter: {
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
  inputField: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleInput: {
    fontSize: 16,
    color: "#4f5157",
    marginHorizontal: 12,
  },
  inputStyle: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
    width: 80,
  },
  unit: {
    fontSize: 14,
    color: "#4f5157",
    marginLeft: 4,
  },
  errorField: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 12,
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
});

export default FilterPost;
