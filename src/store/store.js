import { configureStore } from "@reduxjs/toolkit";
import catItemsReducer from "./slices/catItemsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import auth from "./slices/auth";
import previewReducer from "./slices/previewSlice";
import FavouriteReducer from "./slices/FavouriteSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    catItems: catItemsReducer,
    product: productReducer,
    cart: cartReducer,
    preview: previewReducer,
    fav: FavouriteReducer,
    auth: auth,
  },
});
