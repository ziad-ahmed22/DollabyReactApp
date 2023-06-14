import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ALL_PRODUCTS_URL, CAT_URL } from "../../utils/urls";
import { priceDiscount } from "../../utils/priceDiscount";
import { rating } from "../../utils/rating";

export const fetchCategories = createAsyncThunk(
  "categoriesSlice/fetchCategories",
  async (cat) => {
    const res = await axios.get(`${CAT_URL}/${cat}`);
    return res.data.products;
  }
);
export const fetchAll = createAsyncThunk(
  "categoriesSlice/fetchAll",
  async () => {
    const res = await axios.get(ALL_PRODUCTS_URL);
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

    builder.addCase(fetchAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAll.fulfilled, (state, action) => {
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
    builder.addCase(fetchAll.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { priceHighToLow, priceLowToHigh } = categoriesSlice.actions;
export default categoriesSlice.reducer;
