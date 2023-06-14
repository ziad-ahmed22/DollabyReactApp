import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_DETAILS_URL } from "../../utils/urls";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";

export const fetchProduct = createAsyncThunk(
  "productSlice/fetchProduct",
  async (id) => {
    const res = await axios.get(`${PRODUCT_DETAILS_URL}/${id}`);
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
