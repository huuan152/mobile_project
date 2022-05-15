import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import Utilities from "../../../Components/UtilitiesButton";
import Icon from 'react-native-vector-icons/Entypo';
import IconRec from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import BUTTON_COLORS from '../../../Constants/Utilities/index';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../../../Components/CarouselImage/CarouselCardItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { postSelector } from '../../../redux/selectors';
import { addPostSelector } from '../../../redux/selectors';
import { useDispatch } from 'react-redux';
import { UpdatePostSlice } from '../../UpdatePost/UpdatePostSlice';

const utilitiesItem = ["wifi", "toilet", "motorcycle", "clock", "food", "air-conditioner", "ice-cream", "washing-machine"];

const PostDetail = ({route}) => {
    console.log("Here1", useSelector(addPostSelector));
    console.log("Here",useSelector(postSelector));
    const { rentalPrice, title, address, area, contactName, contactPhone, utilities, description, images } = useSelector(postSelector);
    const [isFavorite, setIsFavorite] = useState(false);
    const [index, setIndex] = React.useState(0);
    const isCarousel = React.useRef(null);
    const nav = useNavigation();
    const dispatch = useDispatch();

    const onPressBackButton = () => {
        dispatch(UpdatePostSlice.actions.updateMotelID(""));
        nav.navigate(route.params.prev);
    }
    const onPressFavoriteButton = () => {
        setIsFavorite(!isFavorite);
    }
    const countSelectedUtilities = () => {
        let count = 0;
        for (const utility in utilities) {
            if (utilities[utility] === BUTTON_COLORS.colorPicked) {
                count++;
            }
        }
        return `Tiện ích (${count})`
    }
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
                <Text style={styles.priceText}>{`${rentalPrice} triệu/tháng `}</Text>
                <TouchableOpacity onPress={onPressFavoriteButton}>
                    {isFavorite ? 
                    <Icon 
                        name="heart" 
                        size={24} 
                        color={BUTTON_COLORS.colorPicked}
                    /> : 
                    <Icon 
                        name="heart-outlined"
                        size={24}
                        color={BUTTON_COLORS.colorPicked}
                    />}
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
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 0,
                            backgroundColor: 'white'
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                    />
                </View>
            </View>
            <View style={styles.detailField}>
                <View style={styles.generalInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.info}>
                        <Icon size={24} color={BUTTON_COLORS.colorPicked} name="location" />
                        <Text style={styles.infoText}>{address}</Text>
                    </View>
                    <View style={styles.info}>
                        <IconRec size={24} color={BUTTON_COLORS.colorPicked} name="vector-rectangle" />
                        <Text style={styles.infoText}>{`${area} m2`}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon size={24} color={BUTTON_COLORS.colorPicked} name="phone" />
                        <Text style={styles.infoText}>{contactPhone}</Text>
                    </View>
                </View>
                <View style={styles.utilitiesField}>
                    <Text style={{...styles.utilitiesTitle, color: BUTTON_COLORS.colorPicked}}>{countSelectedUtilities()}</Text>
                    <View style={styles.utilities}>
                        {utilitiesItem.map((element, index) => {
                            return (
                                <View key={index} style={styles.utilitiesItem}>
                                    <Utilities size={45} color={utilities[element]} name={element} iconClicked={false}/>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.detailInfo}>
                    <Text style={styles.detailInfo}>{description}</Text>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

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
        flexDirection: 'row',
        marginHorizontal: 9,
        marginBottom: 12
    },
    priceText: {
        fontSize: 18,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: '700',
    },
    image: {
        width: "100%",
        height: "100%"
    },
    paginationImages: {
        marginTop: -60
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: BUTTON_COLORS.colorPicked
    },
    detailField: {
        padding: 12
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'gray'
    },
    utilitiesField: {
        marginTop: 12
    },
    utilitiesTitle: {
        fontSize: 16,
    },
    utilities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12
    },
    utilitiesItem: {
        flexBasis: "25%",
        justifyContent: 'flex-end',
    },
    detailInfo: {
        fontSize: 16
    }

})

export default PostDetail; 