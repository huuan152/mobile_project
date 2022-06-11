import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: [],
    searchPost: [],
    locationSearchPost: '',
    favoritePost: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        getListPost: (state, action) => {
            state.post = action.payload;
        },
        getListSearchPost: (state, action) => {
            state.searchPost = action.payload
        },
        getLocationSearchPost: (state, action) => {
            state.locationSearchPost = action.payload;
            state.searchPost = state.post.filter((element, index) => element.address.includes(action.payload));
        },
        getFavoritePost: (state, action) => {
            let listFavorite = [];
            for (let item of action.payload) {
                listFavorite.push(state.post.find(element => element._id === item))
            }
            state.favoritePost = listFavorite;
        }
    }
});