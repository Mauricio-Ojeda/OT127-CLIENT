import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Get } from "../../Services/publicApiService";
import { getSearch } from "../../Services/newsService";

export const getNews = createAsyncThunk("news/getNews", async () => {
  const response = await Get("http://ongapi.alkemy.org/api/news", null);
  return response.data.data;
});

export const getNewSearch = createAsyncThunk("news/getNewsSearch", (value) => {
  return getSearch(value).then((res) => {
    return res.data.data;
  });
});

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: {
      status: "idle",
      data: {},
      error: {},
    },
  },
  reducers: {},
  extraReducers: {
    [getNews.fulfilled.type]: (state, action) => {
      state.news = {
        status: "idle",
        data: action.payload,
        error: {},
      };
    },
    [getNews.rejected.type]: (state, action) => {
      state.news = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
    [getNewSearch.fulfilled.type]: (state, action) => {
      state.news = {
        status: "idle",
        data: action.payload,
        error: {},
      };
    },
    [getNewSearch.rejected.type]: (state, action) => {
      state.news = {
        status: "idle",
        data: {},
        error: action.payload,
      };
    },
  },
});

export default newsSlice.reducer;
