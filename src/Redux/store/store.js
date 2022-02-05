import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../reducers/authReducer";
import newsReducer from "../reducers/newsSlice"
import categoriesReducer from "../reducers/categoriesReducer";

export default configureStore({
  reducer: {
    authReducer: authReducer,
    newsReducer: newsReducer,
    categoriesReducer: categoriesReducer,
  },
});
