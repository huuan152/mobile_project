import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    error: ''
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
        }
    }
});
