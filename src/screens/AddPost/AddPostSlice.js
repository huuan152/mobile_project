import BUTTON_COLORS from '../../Constants/Utilities/index'
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserName = async () => { 
    return await AsyncStorage.getItem('name');
}

const getUserPhone = async () => { 
    return await AsyncStorage.getItem('phone');
}

const initStates = {
    addPost: {
        address: "",
        postType: 0,
        roomType: 0,
        rentalPrice: 0,
        area: 0,
        utilities: {
            "wifi": BUTTON_COLORS.colorBasic,
            "toilet": BUTTON_COLORS.colorBasic,
            "motorcycle": BUTTON_COLORS.colorBasic,
            "clock": BUTTON_COLORS.colorBasic,
            "food": BUTTON_COLORS.colorBasic,
            "air-conditioner": BUTTON_COLORS.colorBasic,
            "ice-cream": BUTTON_COLORS.colorBasic,
            "washing-machine": BUTTON_COLORS.colorBasic
        },
        images: [],
        thumbnail: 0,
        title: "",
        contactName: "",
        contactPhone: "",
        description: ""
    },
    locationScreen: false,
    infoScreen: false,
    imagesScreen: false,
    confirmScreen: false,
}

export const AddPostSlice = createSlice({
    name: 'addPost',
    initialState: initStates,
    reducers: {
        utilitiesColorUpdate: (state, action) => {
            state.addPost.utilities = action.payload
        },
        locationScreenUpdate: (state, action) => {
            state.locationScreen = action.payload
        },
        infoScreenUpdate: (state, action) => {
            state.infoScreen = action.payload
        },
        imagesScreenUpdate: (state, action) => {
            state.imagesScreen = action.payload
        },
        confirmScreenUpdate: (state, action) => {
            state.confirmScreen = action.payload
        },
        locationScreenData: (state, action) => {
            state.addPost.address = action.payload
        },
        infoScreenData: (state, action) => {
            state.addPost.postType = action.payload.postType,
            state.addPost.roomType = action.payload.roomType,
            state.addPost.rentalPrice = action.payload.rentalPrice,
            state.addPost.area = action.payload.area
        },
        imagesScreenData: (state, action) => {
            state.addPost.images = action.payload.images,
            state.addPost.thumbnail = action.payload.thumbnail
        },
        confirmScreenData: (state, action) => {
            state.addPost.title = action.payload.title,
            state.addPost.contactName = action.payload.contactName,
            state.addPost.contactPhone = action.payload.contactPhone,
            state.addPost.description = action.payload.description
        },
        resetPostDetail: (state) => {
            state = initStates
        }
    }
});