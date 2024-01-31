import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./../../api/Axios";

export const fetchCatItems = createAsyncThunk(
  "catItemsSlice/fetchCatItems",
  async () => {
    const res = await api.get("/products/categories");
    return res.data;
  }
);

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const catItemsSlice = createSlice({
  name: "catItemsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCatItems.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchCatItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchCatItems.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default catItemsSlice.reducer;
