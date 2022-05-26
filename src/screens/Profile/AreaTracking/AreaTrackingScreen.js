import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import BUTTON_COLORS from '../../../Constants/Utilities/index';
import District from '../../../Constants/Areas/quan_huyen.json';
import SubDistrict from '../../../Constants/Areas/xa_phuong.json';

const AreaTrackingScreen = (props) => {
    const [search, setSearch] = useState('');
    const [area, setArea] = useState([]);
    const [data, setData] = useState([]);

    const searchArea = (input) => {
        setSearch(input);
        var result = [];
        if (input !== '') {
            var enoughData = false;
            if (area.length === 0) {
                result.push("Thành phố Hà Nội");
            } else if (area[0] === "Thành phố Hà Nội") {
                enoughData = true;
                return false;
            }
            if (enoughData === false) {
                District.every(item => {
                    if (result.length > 10) {
                        enoughData = true;
                        return false;
                    }
                    if (item.name.startsWith(input)) {
                        area.includes(item.name_with_type)
                        if (!area.includes(item.path_with_type)) {
                            result.push(item.path_with_type);
                        }
                    }
                    return true;
                });
            }
            if (enoughData === false) {
                SubDistrict.every(item => {
                    if (result.length > 10) {
                        return false;
                    }
                    if (result.length < 10 && item.name.startsWith(input)) {
                        if (!area.includes(item.path_with_type)) {
                            result.push(item.path_with_type);
                        }
                    }
                    return true;
                });
            }
        }
        setData(result);
    }

    const ItemClicked = (item) => {
        setArea([...area, item]);
        setSearch('');
        setData([]);
    }

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
                        };
                    }
                    setArea(newAreas);
                },
              },
            ]
        );
    }

    const ItemViewSearch = ({item}) => {
        return (
            <TouchableOpacity onPress={() => ItemClicked(item)}>
                <Text style={styles.itemStyle}>{`${item}`}</Text>
            </TouchableOpacity>
        );
    }

    const ItemView = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => deleteArea(item)}>
                <Text style={styles.itemStyle}>{`${index + 1}. ${item}`}</Text>
            </TouchableOpacity>
        );
    }

    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: BUTTON_COLORS.colorBasic}}></View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{marginHorizontal: 24}}>
                <Text style={styles.inputTitle}>Theo dõi khu vực</Text>
                <View style={styles.inputArea}>
                    <TextInput placeholder='Nhập khu vực muốn theo dõi' style={styles.input} value={search} onChangeText={text => searchArea(text)}></TextInput>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemViewSearch}
                >
                </FlatList>
                { area.length !== 0 && data.length === 0 &&
                    <View style={{marginVertical: 15}}>
                        <Text style={styles.inputTitle}>Khu vực được theo dõi</Text>
                        <FlatList
                            data={area}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={(item, index) => ItemView(item, index)}
                        ></FlatList>
                    </View>
                }
            </View>
        </View>
    );
}

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
    inputArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: 'white',
        width: '100%'
    },
    itemStyle: {
        padding: 10,
    },
})

export default AreaTrackingScreen; 