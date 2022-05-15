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
    post: {
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
    deleteMotels: 0,
    updateMotels: 0,
    motelUpdateID: ""
}

export const UpdatePostSlice = createSlice({
    name: 'updatePost',
    initialState: initStates,
    reducers: {
        utilitiesColorUpdate: (state, action) => {
            state.post.utilities = action.payload
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
            state.post.address = action.payload
        },
        infoScreenData: (state, action) => {
            state.post.postType = action.payload.postType,
            state.post.roomType = action.payload.roomType,
            state.post.rentalPrice = action.payload.rentalPrice,
            state.post.area = action.payload.area
        },
        imagesScreenData: (state, action) => {
            state.post.images = action.payload.images,
            state.post.thumbnail = action.payload.thumbnail
        },
        confirmScreenData: (state, action) => {
            state.post.title = action.payload.title,
            state.post.contactName = action.payload.contactName,
            state.post.contactPhone = action.payload.contactPhone,
            state.post.description = action.payload.description
        },
        updatePostDetail: (state, action) => {
            state.post = action.payload
        },
        resetPostDetail: (state) => {
            state = initStates
        },
        deleteMotels: (state) => {
            state.deleteMotels = state.deleteMotels + 1
        },
        updateMotels: (state) => {
            state.updateMotels = state.updateMotels + 1
        },
        updateMotelID: (state, action) => {
            state.motelUpdateID = action.payload
        }
    }
});