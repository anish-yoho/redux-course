import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("post/fetchposts", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("fetchPosts error:", error);
    throw error;
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // You can define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        console.log("fetchPosts:", state.status);
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("fetchPosts:", action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("fetchPosts:", action.error.message);
      });
  },
});

export default postSlice.reducer;
