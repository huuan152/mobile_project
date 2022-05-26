import { configureStore } from "@reduxjs/toolkit";
import { AddPostSlice } from "../screens/AddPost/AddPostSlice";
import { UpdatePostSlice } from "../screens/UpdatePost/UpdatePostSlice";
import { userSlice } from "./slice/userSlice";
import { postSlice } from "./slice/postSlice";

const store = configureStore({
  reducer: {
    addPost: AddPostSlice.reducer,
    updatePost: UpdatePostSlice.reducer,
    user: userSlice.reducer,
    post: postSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
