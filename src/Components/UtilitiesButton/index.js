import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { StyleSheet, Text } from "react-native";

const Utilities = (props) => {
    const { name, iconClicked, size } = props;
    const [color, setColor] = useState(props.color);

    const changeIconColor = () => {
        if (iconClicked) {
            setColor(color == BUTTON_COLORS.colorBasic ? BUTTON_COLORS.colorPicked : BUTTON_COLORS.colorBasic);
        }
    }

    if(name === "wifi") {
        return (
            <>
                <FontAwesome.Button 
                    name="wifi" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Wifi</Text>
            </>
        );
    }
    else if (name === "toilet") {
        return (
            <>
                <FontAwesome5.Button 
                    name="toilet" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>WC riêng</Text>
            </>
        );
    }
    else if (name === "motorcycle") {
        return (
            <>
                <Fontisto.Button 
                    name="motorcycle" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Chỗ để xe</Text>
            </>
        );
    }
    else if (name === "clock") {
        return (
            <>
                <FontAwesome5.Button 
                    name="clock" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Tự do</Text>
            </>
        );
    }
    else if (name === "food") {
        return (
            <>
                <MaterialCommunityIcons.Button 
                    name="food" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Bếp</Text>
            </>
        );
    }
    else if (name === "air-conditioner") {
        return (
            <>
                <MaterialCommunityIcons.Button 
                    name="air-conditioner" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Điều hòa</Text>
            </>
        );
    }
    else if (name === "ice-cream") {
        return  (
            <>
                <FontAwesome5.Button 
                    name="ice-cream" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Tủ lạnh</Text>
            </>
        );
    }
    else if (name === "washing-machine") {
        return (
        <>
            <MaterialCommunityIcons.Button 
                    name="washing-machine" 
                    color={color} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: color}}>Máy giặt</Text>
            </>
        );
    } else {
        return <Text>Error</Text>;
    }
}
const styles = StyleSheet.create({
    buttonIcon: {
        justifyContent: 'center', 
        paddingRight: 0,
        textShadowColor: 'black',
    },
    textIcon: {
        fontSize: 15, 
        textAlign: 'center',
    }
})

export default Utilities;