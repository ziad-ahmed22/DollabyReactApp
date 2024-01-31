import { configureStore } from "@reduxjs/toolkit";

import AllProductSliceReducer from "./slices/AllProductSlice";
import categoriesReducer from "./slices/categoriesSlice";
import FavouriteReducer from "./slices/FavouriteSlice";
import catItemsReducer from "./slices/catItemsSlice";
import previewReducer from "./slices/previewSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import auth from "./slices/auth";

export const store = configureStore({
  reducer: {
    allProducts: AllProductSliceReducer,
    categories: categoriesReducer,
    catItems: catItemsReducer,
    product: productReducer,
    cart: cartReducer,
    preview: previewReducer,
    fav: FavouriteReducer,
    auth: auth,
  },
});
