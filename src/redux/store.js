import { configureStore } from "@reduxjs/toolkit";
import { AddPostSlice } from "../screens/AddPost/AddPostSlice";
import { UpdatePostSlice } from "../screens/UpdatePost/UpdatePostSlice";

const store = configureStore({
    reducer: {
        addPost: AddPostSlice.reducer,
        updatePost: UpdatePostSlice.reducer
    }
});

export default store;