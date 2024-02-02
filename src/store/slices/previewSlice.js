import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  productId: null,
};

const previewSlice = createSlice({
  name: "previewSlice",
  initialState,
  reducers: {
    openPreview: (state, action) => {
      state.isOpen = true;
      state.productId = action.payload;
    },

    closePreview: (state) => {
      state.isOpen = false;
      // state.productId = null;
    },
  },
});

export default previewSlice.reducer;
export const { openPreview, closePreview } = previewSlice.actions;
