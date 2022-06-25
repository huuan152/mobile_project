import React, { useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import Utilities from "../../../Components/UtilitiesButton";
import Icon from "react-native-vector-icons/Entypo";
import IconRec from "react-native-vector-icons/MaterialCommunityIcons";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import BUTTON_COLORS from "../../../Constants/Utilities/index";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from "../../../Components/CarouselImage/CarouselCardItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  postSelector,
  motelUpdateID,
  favoriteMotels,
} from "../../../redux/selectors";
import { useDispatch } from "react-redux";
import { UpdatePostSlice } from "../../UpdatePost/UpdatePostSlice";
import userApi from "../../../api/userApi";
import Map from "../../../Components/map";

const utilitiesItem = [
  "wifi",
  "toilet",
  "motorcycle",
  "clock",
  "food",
  "air-conditioner",
  "ice-cream",
  "washing-machine",
];

const PostDetail = ({ route }) => {
  const {
    rentalPrice,
    title,
    address,
    area,
    contactName,
    contactPhone,
    utilities,
    description,
    images,
  } = useSelector(postSelector);
  const motelID = useSelector(motelUpdateID);
  const myFavoriteMotels = useSelector(favoriteMotels);
  const [isFavorite, setIsFavorite] = useState(() => {
    for (const motel of myFavoriteMotels) {
      if (motel._id === motelID) {
        return true;
      }
    }
    return false;
  });
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const nav = useNavigation();
  const dispatch = useDispatch();

  const onPressBackButton = () => {
    dispatch(UpdatePostSlice.actions.updateMotelID(""));
    nav.goBack();
  };
  const onPressFavoriteButton = async () => {
    try {
      setIsFavorite(!isFavorite);
      await userApi.toggleFavoriteMotel(motelID);
    } catch (error) {
      console.log(error);
    }
  };
  const countSelectedUtilities = () => {
    let count = 0;
    for (const utility in utilities) {
      if (utilities[utility] === BUTTON_COLORS.colorPicked) {
        count++;
      }
    }
    return `Tiện ích (${count})`;
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.priceField}>
          <TouchableOpacity onPress={onPressBackButton}>
            <IconMaterial
              name="arrow-back-ios"
              size={24}
              color={BUTTON_COLORS.colorPicked}
            />
          </TouchableOpacity>
          <Text style={styles.priceText}>{formatPrice()}</Text>
          <TouchableOpacity onPress={onPressFavoriteButton}>
            {isFavorite ? (
              <Icon name="heart" size={24} color={BUTTON_COLORS.colorPicked} />
            ) : (
              <Icon
                name="heart-outlined"
                size={24}
                color={BUTTON_COLORS.colorPicked}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            ref={isCarousel}
            data={images}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          <View style={styles.paginationImages}>
            {images.length > 1 ? (
              <Pagination
                dotsLength={images.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: "white",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            ) : (
              <View style={{ height: 70 }}></View>
            )}
          </View>
        </View>
        <View style={styles.detailField}>
          <View style={styles.generalInfo}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.info}>
              <Icon
                size={24}
                color={BUTTON_COLORS.colorPicked}
                name="location"
              />
              <Text style={styles.infoText}>{address}</Text>
            </View>
            <View style={styles.info}>
              <IconRec
                size={24}
                color={BUTTON_COLORS.colorPicked}
                name="vector-rectangle"
              />
              <Text style={styles.infoText}>{`${area} m2`}</Text>
            </View>
            <View style={styles.info}>
              <Icon size={24} color={BUTTON_COLORS.colorPicked} name="phone" />
              <Text style={styles.infoText}>{contactPhone}</Text>
            </View>
          </View>
          <View style={styles.utilitiesField}>
            <Text
              style={{
                ...styles.utilitiesTitle,
                color: BUTTON_COLORS.colorPicked,
              }}
            >
              {countSelectedUtilities()}
            </Text>
            <View style={styles.utilities}>
              {utilitiesItem.map((element, index) => {
                return (
                  <View key={index} style={styles.utilitiesItem}>
                    <Utilities
                      size={45}
                      color={utilities[element]}
                      name={element}
                      iconClicked={false}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.utilitiesField}>
            <Text
              style={{
                ...styles.utilitiesTitle,
                color: BUTTON_COLORS.colorPicked,
              }}
            >
              Bản đồ
            </Text>
            <View style={{ height: 200 }}>
              <Map address={address}></Map>
            </View>
          </View>
          <View style={{ ...styles.utilitiesField, marginBottom: 30 }}>
            <Text
              style={{
                ...styles.utilitiesTitle,
                color: BUTTON_COLORS.colorPicked,
              }}
            >
              Mô tả chi tiết
            </Text>
            <Text style={styles.detailInfo}>{description}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// const ListImage = () => {
//     return (
//         <View style={styles.listImage}>
//             <Image source={require('../SinglePostForList/phong_tro.png')} style={styles.image}/>
//         </View>
//     )
// }

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  priceField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 12,
    marginHorizontal: 9,
  },
  priceText: {
    fontSize: 18,
    color: BUTTON_COLORS.colorPicked,
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  paginationImages: {
    marginTop: -60,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: BUTTON_COLORS.colorPicked,
    marginBottom: 8,
    paddingLeft: 8,
  },
  detailField: {
    paddingHorizontal: 12,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  infoText: {
    marginLeft: 18,
    fontSize: 16,
    color: "gray",
    flex: 1,
  },
  utilitiesField: {
    marginTop: 12,
  },
  utilitiesTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    paddingLeft: 8,
  },
  utilities: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  utilitiesItem: {
    flexBasis: "25%",
    justifyContent: "flex-end",
  },
  detailInfo: {
    fontSize: 16,
    paddingLeft: 8,
  },
});

export default PostDetail;
