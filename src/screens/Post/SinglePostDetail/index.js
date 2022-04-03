import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import Utilities from "../../../Components/UtilitiesButton";
import Icon from 'react-native-vector-icons/Entypo';
import IconRec from 'react-native-vector-icons/MaterialCommunityIcons';

const mock_data = {
    price: "5.5",
    title: "Gần lotte mart quận 7",
    addressText: "tòa nhà số 36, Phạm Hùng, quận Cầu Giấy",
    area: 40,
    phoneNumber: "0967326546",
    utilities: [
        "wifi",
        "toilet",
        "motorcycle",
        "clock",
        "food",
        "air-conditioner",
        "ice-cream",
        "washing-machine"
    ],
    detailInfo: "While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs."
}

const PostDetail = (props) => {
    const { price, title, addressText, area, phoneNumber, utilities, detailInfo } = mock_data;
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.priceField}>
                <Text style={styles.priceText}>{`${price} triệu/tháng `}</Text>
            </View>
            <ListImage />
            <View style={styles.generalInfo}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.info}>
                    <Icon size={24} color={'#458dc4'} name="location" />
                    <Text style={styles.infoText}>{addressText}</Text>
                </View>
                <View style={styles.info}>
                    <IconRec size={24} color={'#458dc4'} name="vector-rectangle" />
                    <Text style={styles.infoText}>{`${area} m2`}</Text>
                </View>
                <View style={styles.info}>
                    <Icon size={24} color={'#458dc4'} name="phone" />
                    <Text style={styles.infoText}>{phoneNumber}</Text>
                </View>
            </View>
            <View style={styles.utilitiesField}>
                <Text style={styles.utilitiesTitle}>{`Tiện ích(${utilities.length})`}</Text>
                <View style={styles.utilities}>
                    {utilities.map((element, index) => {
                        return (
                            <View style={styles.utilitiesItem}>
                                <Utilities key={index} size={45} color={'#458dc4'} name={element} />
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={styles.detailInfo}>
                <Text>{detailInfo}</Text>
            </View>
        </View>
        </ScrollView>
    );
}

const ListImage = () => {
    return (
        <View style={styles.listImage}>
            <Image source={require('../SinglePostForList/phong_tro.png')} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        padding: 12
    },
    priceField: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    priceText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4285F4"
    },
    listImage: {
        width: "100%",
        height: 160
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4285F4"
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12
    },
    infoText: {
        marginLeft: 12,
        fontSize: 16,
        color: 'gray'
    },
    utilitiesField: {
        marginTop: 12
    },
    utilitiesTitle: {
        fontSize: 18,
        color: "#4285F4",
        marginLeft: 16
    },
    utilities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    utilitiesItem: {
        flexBasis: "25%"
    }

})

export default PostDetail; 