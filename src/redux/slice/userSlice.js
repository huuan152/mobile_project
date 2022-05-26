import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    isLogIn: false,
    error: '',
    sending: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload
        },
        logOut: (state, action) => {
            state.user = null
        },
        logInState: (state, action) => {
            state.isLogIn = action.payload
        },
        updateFavoriteMotels: (state, action) => {
            state.user.favoriteMotels = action.payload
        },
        setSendingState: (state, action) => {
            state.sending = action.payload;
        }
    }
});
