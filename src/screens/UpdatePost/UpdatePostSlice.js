import BUTTON_COLORS from '../../Constants/Utilities/index'
import { createSlice } from '@reduxjs/toolkit';

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
    sending: false,
    deleteMotels: 0,
    updateMotels: 0,
    motelUpdateID: ""
}

export const UpdatePostSlice = createSlice({
    name: 'updatePost',
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
            state.post.address = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setPostType: (state, action) => {
            state.post.postType = action.payload
        },
        setRoomType: (state, action) => {
            state.post.roomType = action.payload
        },
        setRentalPrice: (state, action) => {
            state.post.rentalPrice = action.payload
        },
        setArea: (state, action) => {
            state.post.area = action.payload
        },
        utilitiesColorUpdate: (state, action) => {
            state.post.utilities = action.payload
        },
        setImages: (state, action) => {
            state.post.images = action.payload
        },
        setThumbnail: (state, action) => {
            state.thumbnail = action.payload
        },
        setTitle: (state, action) => {
            state.post.title = action.payload
        },
        setContactName: (state, action) => {
            state.post.contactName = action.payload
        },
        setContactPhone: (state, action) => {
            state.post.contactPhone = action.payload
        },
        setDescription: (state, action) => {
            state.post.description = action.payload
        },
        setSendingState: (state, action) => {
            state.sending = action.payload
        },
        updatePostDetail: (state, action) => {
            state.post.address = action.payload.address
            state.post.postType = action.payload.postType
            state.post.roomType = action.payload.roomType
            state.post.rentalPrice = action.payload.rentalPrice
            state.post.area = action.payload.area
            state.utilities = action.payload.utilities
            state.post.postType = action.payload.postType
            state.post.roomType = action.payload.roomType
            state.post.rentalPrice = action.payload.rentalPrice
            state.post.area = action.payload.area
            state.post.utilities = action.payload.utilities
            state.post.images = action.payload.images
            state.post.title = action.payload.title
            state.post.contactName = action.payload.contactName
            state.post.contactPhone = action.payload.contactPhone
            state.post.description = action.payload.description
            state.locationScreen = true
            state.infoScreen = true
            state.imagesScreen = true
            state.confirmScreen = true
            state.search = action.payload.address
            state.thumbnail = 0
            state.sending = false
        },
        resetPostDetail: (state) => {
            return initStates
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