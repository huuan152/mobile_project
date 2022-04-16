import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import BUTTON_COLORS from '../../Constants/Utilities/index';

const SeachScreen = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const [items, setItems] = useState([]);

    const searchLocation = async (input) => {
        var newItems = [];    
        // API search
        // await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=vi&components=country:vn&types=geocode&key=AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ`)
        // .then(function (response) {
        //     console.log(response);
        //     response.data.predictions.forEach((element, index) => {
        //         console.log(element.description);
        //          newItems.push({
        //              id: index,
        //              name: element
        //          })
        //     })
        //     setItems(newItems);
        // })
        // .catch (function (error) { 
        //     console.log(error);
        // });
        setItems(newItems);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{'Tìm kiếm'}</Text>
            <SearchableDropdown 
                selectedItems={selectedItems}
                onItemSelect={(item) => {
                    setSelectedItems(item);
                    console.log(item);
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderColor: BUTTON_COLORS.colorBasic,
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: 'black' }}
                items={items}
                textInputProps={{
                    placeholder: "Tìm quận, đường...",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 6,
                        borderWidth: 1,
                        borderColor: BUTTON_COLORS.colorBasic,
                        borderRadius: 5,
                    },
                    onTextChange: text => searchLocation(text)
                }}
                listProps={{
                    nestedScrollEnabled: true,
                }}
            />
            <TouchableOpacity>
                <Text style={styles.searchText}>{'Tìm quanh đây'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 48,
    },
    header: {
        fontSize: 32,
        color: 'rgba(71, 98, 234, 0.8)',
        fontWeight: 'bold',
        marginLeft: 6
    },
    searchText: {
        marginLeft: 6,
        fontSize: 16,
        marginTop: 6
    }
})

export default SeachScreen;