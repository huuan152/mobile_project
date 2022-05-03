import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList, Pressable } from "react-native";
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import BUTTON_COLORS from '../../../Constants/Utilities/index';
import City from '../../../Constants/Areas/tinh_tp.json';
import District from '../../../Constants/Areas/quan_huyen.json';
import SubDistrict from '../../../Constants/Areas/xa_phuong.json';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AreaTrackingScreen = (props) => {
    const [search, setSearch] = useState('');
    const [area, setArea] = useState([]);
    const [data, setData] = useState([]);

    const searchArea = (input) => {
        setSearch(input);
        var result = [];
        if (input !== '') {
            var enoughData = false;
            City.every(x => {
                if (result.length > 10) {
                    enoughData = true;
                    return false;
                }
                if (x.name.startsWith(input)) {
                    result.push(x.name_with_type);
                }
                return true;
            });
            if (enoughData === false) {
                District.every(x => {
                    if (result.length > 10) {
                        enoughData = true;
                        return false;
                    }
                    if (x.name.startsWith(input)) {
                        result.push(x.path_with_type);
                    }
                    return true;
                });
            }
            if (enoughData === false) {
                SubDistrict.every(x => {
                    if (result.length > 10) {
                        return false;
                    }
                    if (result.length < 10 && x.name.startsWith(input)) {
                        result.push(x.path_with_type);
                    }
                    return true;
                });
            }
        }
        setData(result);
    }

    const ItemClicked = (item) => {
        searchArea(item);
    }

    const ItemView = ({item}) => {
        return (
            <Pressable onPress={() => ItemClicked(item)}>
                <Text style={styles.itemStyle}>{item}</Text>
            </Pressable>
        );
    }

    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: BUTTON_COLORS.colorBasic}}></View>
        );
    }

    const addNewAreaTracking = () => {
        setArea([...area, search]);
        setSearch('');
    }

    return (
        <View style={styles.container}>
            <View style={{marginHorizontal: 24}}>
                <Text style={styles.inputTitle}>Theo dõi khu vực</Text>
                <View style={styles.inputArea}>
                    <TextInput placeholder='Nhập khu vực muốn theo dõi' style={styles.input} value={search} onChangeText={text => searchArea(text)}></TextInput>
                    <TouchableOpacity style={{backgroundColor: BUTTON_COLORS.colorPicked, padding: 10, borderRadius: 5}} onPress={addNewAreaTracking}>
                        <Text style={{color: 'white'}}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                >
                </FlatList>
                { data.length === 0 &&
                    <View style={{marginVertical: 15}}>
                        <Text style={styles.inputTitle}>Khu vực được theo dõi</Text>
                        <FlatList
                            data={area}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={ItemSeparatorView}
                            renderItem={ItemView}
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
        width: '80%'
    },
    itemStyle: {
        padding: 10,
    },
})

export default AreaTrackingScreen; 