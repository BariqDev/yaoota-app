import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./feature/PostsSlice/Postslice";
const store = configureStore({
  reducer: {
    posts: postsSlice,
  },
});

export default store;
