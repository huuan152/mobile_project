import BUTTON_COLORS from '../../Constants/Utilities/index'
import { createSlice } from '@reduxjs/toolkit';

const initStates = {
    addPost: {
        address: "",
        postType: 0,
        roomType: 0,
        rentalPrice: "",
        area: "",
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
        title: "",
        contactName: "",
        contactPhone: "",
        description: ""
    },
    locationScreen: false,
    infoScreen: false,
    imagesScreen: false,
    confirmScreen: false,
    search: "",
    thumbnail: 0,
    sending: false
}

export const AddPostSlice = createSlice({
    name: 'addPost',
    initialState: initStates,
    reducers: {
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
        setLocation: (state, action) => {
            state.addPost.address = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setPostType: (state, action) => {
            state.addPost.postType = action.payload
        },
        setRoomType: (state, action) => {
            state.addPost.roomType = action.payload
        },
        setRentalPrice: (state, action) => {
            state.addPost.rentalPrice = action.payload
        },
        setArea: (state, action) => {
            state.addPost.area = action.payload
        },
        utilitiesColorUpdate: (state, action) => {
            state.addPost.utilities = action.payload
        },
        setImages: (state, action) => {
            state.addPost.images = action.payload
        },
        setThumbnail: (state, action) => {
            state.thumbnail = action.payload
        },
        setTitle: (state, action) => {
            state.addPost.title = action.payload
        },
        setContactName: (state, action) => {
            state.addPost.contactName = action.payload
        },
        setContactPhone: (state, action) => {
            state.addPost.contactPhone = action.payload
        },
        setDescription: (state, action) => {
            state.addPost.description = action.payload
        },
        setSendingState: (state, action) => {
            state.sending = action.payload
        },
        resetAddPost: (state) => {
            return initStates
        },
    }
});