import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";
import { api } from "./../../api/Axios";

export const fetchModalProduct = createAsyncThunk(
  "previewSlice/fetchModalProduct",
  async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  }
);

const initialState = {
  loading: false,
  data: {},
  error: "",
  isOpen: false,
};

const previewSlice = createSlice({
  name: "previewSlice",
  initialState,
  reducers: {
    openPreview: (state) => {
      state.isOpen = true;
    },
    closePreview: (state) => {
      state.isOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchModalProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchModalProduct.fulfilled, (state, action) => {
      state.loading = false;
      const priceAfterDiscount = priceDiscount(
        action.payload.price,
        action.payload.discountPercentage
      );
      const ratingStars = rating(action.payload.rating);
      state.data = { ...action.payload, priceAfterDiscount, ratingStars };
    });

    builder.addCase(fetchModalProduct.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default previewSlice.reducer;
export const { openPreview, closePreview } = previewSlice.actions;
