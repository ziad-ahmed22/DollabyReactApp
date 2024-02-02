import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";

import FavouriteReducer from "./slices/FavouriteSlice";
import previewReducer from "./slices/previewSlice";
import cartReducer from "./slices/cartSlice";
import auth from "./slices/auth";

import { productApi } from "./apis/productApi";

export const store = configureStore({
  reducer: {
    auth: auth,
    cart: cartReducer,
    fav: FavouriteReducer,
    preview: previewReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);
