import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";
import { api } from "../../api/Axios";

export const fetchAllProducts = createAsyncThunk(
  "allProductSlice/fetchAllProducts",
  async () => {
    const res = await api.get("/products?limit=100");
    return res.data.products;
  }
);

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const allProductSlice = createSlice({
  name: "allProductSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.map((product) => {
        const priceAfterDiscount = priceDiscount(
          product.price,
          product.discountPercentage
        );
        const ratingStars = rating(product.rating);
        return { ...product, priceAfterDiscount, ratingStars };
      });
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default allProductSlice.reducer;
