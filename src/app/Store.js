import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/PostList/PostSlice";
import userReducer from "../features/PostList/UserSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export default store;
