import { View, Text, StyleSheet } from 'react-native';

import CustomListPost from "../ListPost";
const ListPostWithAddress = ({data, title}) => {
    return (
        <View>
            <Text>{title}</Text>
            <CustomListPost data={data} />
        </View>
    );
}

export default ListPostWithAddress;