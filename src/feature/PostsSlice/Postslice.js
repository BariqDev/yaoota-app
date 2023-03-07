import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  searchedPosts: [],
  activePosts: [],
  activePost: {},
  isAppliedFilter: false,
  loading: true,
  pages: 0,
  error: "",
};
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  try {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchPostById = createAsyncThunk("posts/fetchPost", async (id) => {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsByPage: (state, action) => {
      const end = parseInt(action.payload) * 20;
      const start = end - 20;
      if (state.isAppliedFilter) {
        state.activePosts = state.searchedPosts.slice(start, end);

      } else {
        state.activePosts = state.posts.slice(start, end);

      }
    },
    searchPosts: (state, action) => {
      if (action.payload) {
        const result = state.posts.filter((post) => post.title.includes(action.payload));
        state.searchedPosts = result;
        state.isAppliedFilter = true;
        state.activePosts = result.slice(0, 19);
        state.pages = Math.ceil(result.length / 20);
      } else {
        state.searchedPosts = [];
        state.isAppliedFilter = false;
        state.activePosts = state.posts.slice(0, 19)
        state.pages = Math.ceil(state.posts.length / 20)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
      state.activePosts = action.payload.slice(0, 19);
      state.pages = Math.ceil(action.payload.length / 20);
    });
    builder.addCase(fetchPostById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.activePost = action.payload;
      state.loading = false;
    });
  },
});
export default postsSlice.reducer;
export const { getPostsByPage, searchPosts } = postsSlice.actions;
