import { configureStore } from "@reduxjs/toolkit";
import PostDetailsSlice from "./feature/PostDetailsSlice/PostDetailsSlice";
import Postslice from "./feature/PostsSlice/PostsSlice";
const store = configureStore({
  reducer: {
    posts: Postslice,
    postDetails: PostDetailsSlice,
  },
});

export default store;
