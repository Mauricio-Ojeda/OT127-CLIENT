import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducers/authReducer";
import newsReducer from "../reducers/newsSlice";
import slidesReducer from "../reducers/slidesSlice";

export default configureStore({
  reducer: {
    authReducer: authReducer,
    newsReducer: newsReducer,
    slidesReducer,
  },
});
