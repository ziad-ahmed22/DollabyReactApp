import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CAT_ITEMS_URL } from "../../utils/urls";

export const fetchCatItems = createAsyncThunk(
  "catItemsSlice/fetchCatItems",
  async () => {
    const res = await axios.get(CAT_ITEMS_URL);
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
