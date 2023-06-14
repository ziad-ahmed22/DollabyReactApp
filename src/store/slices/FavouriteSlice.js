import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [],
};

export const FavouriteSlice = createSlice({
  name: "FavouriteSlice",
  initialState,
  reducers: {
    toggleFav: (state, action) => {
      if (state.data.find((product) => product.id === action.payload.id)) {
        state.data = state.data.filter(
          (product) => product.id !== action.payload.id
        );
        localStorage.setItem("fav", JSON.stringify(state.data));
      } else {
        state.data.push(action.payload);
        localStorage.setItem("fav", JSON.stringify(state.data));
      }
    },
    clearFav: (state) => {
      state.data = [];
      localStorage.removeItem("fav");
    },
  },
});

export default FavouriteSlice.reducer;
export const { toggleFav, clearFav } = FavouriteSlice.actions;
