import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./feature/PostsSlice/PostSlice";
import PostDetailsSlice from "./feature/PostDetailsSlice/PostDetailsSlice";
const store = configureStore({
  reducer: {
    posts: postsSlice,
    postDetails: PostDetailsSlice
  },
});

export default store;
