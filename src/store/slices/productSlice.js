import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";
import { api } from "../../api/Axios";

export const fetchProduct = createAsyncThunk(
  "productSlice/fetchProduct",
  async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  }
);

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      const priceAfterDiscount = priceDiscount(
        action.payload.price,
        action.payload.discountPercentage
      );
      const ratingStars = rating(action.payload.rating);
      state.data = { ...action.payload, priceAfterDiscount, ratingStars };
    });

    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
