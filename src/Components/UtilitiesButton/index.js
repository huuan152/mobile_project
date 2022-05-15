import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import { StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { addPostUtilitiesColorSelector, postUtilitiesColorSelector } from '../../redux/selectors';
import { AddPostSlice } from '../../screens/AddPost/AddPostSlice';
import { UpdatePostSlice } from '../../screens/UpdatePost/UpdatePostSlice';

const Utilities = (props) => {
    const { name, iconClicked, size, addPost } = props;
    const dispatch = useDispatch();
    const utilities = useSelector((addPost !== undefined && addPost) ? addPostUtilitiesColorSelector : postUtilitiesColorSelector);
    console.log(utilities);

    const changeIconColor = (name) => {
        if (iconClicked) {
            let newColor = utilities[name] === BUTTON_COLORS.colorBasic ? BUTTON_COLORS.colorPicked : BUTTON_COLORS.colorBasic;
            if (addPost) {
                dispatch(AddPostSlice.actions.utilitiesColorUpdate({
                    ...utilities,
                    [name]: newColor
                }));
            } else {
                dispatch(UpdatePostSlice.actions.utilitiesColorUpdate({
                    ...utilities,
                    [name]: newColor
                }));
            }
        }
    }

    if(name === "wifi") {
        return (
            <>
                <FontAwesome.Button 
                    name="wifi" 
                    color={utilities[name]}
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Wifi</Text>
            </>
        );
    }
    else if (name === "toilet") {
        return (
            <>
                <FontAwesome5.Button 
                    name="toilet" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>WC riêng</Text>
            </>
        );
    }
    else if (name === "motorcycle") {
        return (
            <>
                <Fontisto.Button 
                    name="motorcycle" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Chỗ để xe</Text>
            </>
        );
    }
    else if (name === "clock") {
        return (
            <>
                <FontAwesome5.Button 
                    name="clock" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Tự do</Text>
            </>
        );
    }
    else if (name === "food") {
        return (
            <>
                <MaterialCommunityIcons.Button 
                    name="food" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Bếp</Text>
            </>
        );
    }
    else if (name === "air-conditioner") {
        return (
            <>
                <MaterialCommunityIcons.Button 
                    name="air-conditioner" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Điều hòa</Text>
            </>
        );
    }
    else if (name === "ice-cream") {
        return  (
            <>
                <FontAwesome5.Button 
                    name="ice-cream" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Tủ lạnh</Text>
            </>
        );
    }
    else if (name === "washing-machine") {
        return (
        <>
            <MaterialCommunityIcons.Button 
                    name="washing-machine" 
                    color={utilities[name]} 
                    backgroundColor="transparent" 
                    underlayColor="transparent" 
                    onPress={() => changeIconColor(name)}
                    size={size} 
                    style={styles.buttonIcon}
                />
                <Text style={{...styles.textIcon, color: utilities[name]}}>Máy giặt</Text>
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