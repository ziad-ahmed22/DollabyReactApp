import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";
import { api } from "./../../api/Axios";

export const fetchCategories = createAsyncThunk(
  "categoriesSlice/fetchCategories",
  async (cat) => {
    const res = await api.get(`/products/category/${cat}`);
    return res.data.products;
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categoriesSlice/fetchAllCategories",
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

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    priceLowToHigh: (state) => {
      state.data = state.data.sort(
        (x, y) => x.priceAfterDiscount - y.priceAfterDiscount
      );
    },

    priceHighToLow: (state) => {
      state.data = state.data.sort(
        (x, y) => y.priceAfterDiscount - x.priceAfterDiscount
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
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

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
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

    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { priceHighToLow, priceLowToHigh } = categoriesSlice.actions;
export default categoriesSlice.reducer;
