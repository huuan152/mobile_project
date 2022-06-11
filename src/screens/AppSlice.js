import { createSlice } from '@reduxjs/toolkit';

const initStates = {
    isLogIn: false,
}

export const AppSlice = createSlice({
    name: 'app',
    initialState: initStates,
    reducers: {
        logIn: (state, action) => {
            state.isLogIn = action.payload
        }
    }
});