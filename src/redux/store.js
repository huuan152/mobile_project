import { configureStore } from "@reduxjs/toolkit";
import { AddPostSlice } from "../screens/AddPost/AddPostSlice";
import { UpdatePostSlice } from "../screens/UpdatePost/UpdatePostSlice";
import { AppSlice } from "../screens/AppSlice";
import { userSlice } from "./slice/userSlice";
import { postSlice } from "./slice/postSlice";

const store = configureStore({
<<<<<<< Updated upstream
  reducer: {
    addPost: AddPostSlice.reducer,
    updatePost: UpdatePostSlice.reducer,
    app: AppSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
=======
    reducer: {
        addPost: AddPostSlice.reducer,
        updatePost: UpdatePostSlice.reducer,
        app: AppSlice.reducer,
        user: userSlice.reducer,
        post: postSlice.reducer
    }
>>>>>>> Stashed changes
});

export default store;
