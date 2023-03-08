import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    activePost: {},
    comments: [],
    loading: true,
    user: null,
};

export const fetchPostDetails = createAsyncThunk("postDetails/fetchPost", async (postId) => {
    try {
        const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = postResponse.data;

        const commentsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const comments = commentsResponse.data;

        const userId = post["userId"];
        const usersResponse = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        const user = usersResponse.data.find((user) => user.id == userId);

        return {
            post,
            user,
            comments,
        };
    } catch (error) {
        console.log(error);
    }
});


const postDetailsSlice = createSlice({
    name: 'postDetails',
    reducers: {
        addComment: (state, action) => {
            state.comments = [...state.comments, action.payload];
        },
    },
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPostDetails.pending, (state, action) => {
            state.loading = true;
            state.user = null;
            state.activePost = {};
            state.comments = [];

        });
        builder.addCase(fetchPostDetails.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.activePost = action.payload.post;
            state.comments = action.payload.comments;
            state.loading = false;
        });
    }
})


export default postDetailsSlice.reducer;
export const { addComment } = postDetailsSlice.actions;