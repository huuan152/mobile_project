import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { StyleSheet } from "react-native";

const Utilities = (props) => {
    const { name, color, iconClicked, size } = props;
    if(name === "wifi") {
        return <FontAwesome.Button 
                    name="wifi" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('wifi')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "toilet") {
        return <FontAwesome5.Button 
                    name="toilet" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('wc')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "motorcycle") {
        return <Fontisto.Button 
                    name="motorcycle" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('parkingLot')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "clock") {
        return <FontAwesome5.Button 
                    name="clock" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('noCurfew')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "food") {
        return <MaterialCommunityIcons.Button 
                    name="food" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('kitchen')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "air-conditioner") {
        return <MaterialCommunityIcons.Button 
                    name="air-conditioner" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('airConditioner')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "ice-cream") {
        return <FontAwesome5.Button 
                    name="ice-cream" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('refrigerator')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
    else if (name === "washing-machine") {
        return <MaterialCommunityIcons.Button 
                    name="washing-machine" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    //onPress={() => iconClicked('washingMachine')} 
                    size={size} 
                    style={styles.buttonIcon}
                />
    }
}
const styles = StyleSheet.create({
    buttonIcon: {
        justifyContent: 'center', 
        paddingRight: 0,
        textShadowColor: 'black',
    },
})

export default Utilities;