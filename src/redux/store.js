import { configureStore } from "@reduxjs/toolkit";
import { AddPostSlice } from "../screens/AddPost/AddPostSlice";
import { UpdatePostSlice } from "../screens/UpdatePost/UpdatePostSlice";
import { AppSlice } from "../screens/AppSlice";

const store = configureStore({
    reducer: {
        addPost: AddPostSlice.reducer,
        updatePost: UpdatePostSlice.reducer,
        app: AppSlice.reducer
    }
});

export default store;