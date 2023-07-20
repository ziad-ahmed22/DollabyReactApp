import { createSlice } from "@reduxjs/toolkit";
import { priceDiscount } from "./../../utils/priceDiscount";

const initialState = {
  cartData: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartPrice: 0,
  cartQuantity: 0,
  productQuantity: 0,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    increaseItemQuantity: (state, action) => {
      const productIncart = state.cartData.find(
        (product) => product.id === action.payload.id
      );

      if (productIncart) {
        state.cartData = state.cartData.map((product) => {
          if (product.id === action.payload.id) {
            const quantity =
              product.quantity < product.stock
                ? product.quantity + 1
                : product.quantity;
            const totalPrice = quantity * product.priceAfterDiscount;
            return { ...product, quantity, totalPrice };
          } else {
            return product;
          }
        });
      } else {
        const quantity = 1;
        const priceAfterDiscount = priceDiscount(
          action.payload.price,
          action.payload.discountPercentage
        );
        const totalPrice = quantity * priceAfterDiscount;
        const newProduct = {
          ...action.payload,
          quantity,
          priceAfterDiscount,
          totalPrice,
        };
        state.cartData = [...state.cartData, newProduct];
      }
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

    decreaseItemQuantity: (state, action) => {
      state.cartData = state.cartData
        .map((product) => {
          if (product.id === action.payload) {
            if (product.quantity === 1) {
              return null;
            }
            const quantity = product.quantity - 1;
            const totalPrice = quantity * product.priceAfterDiscount;
            return { ...product, quantity, totalPrice };
          } else {
            return product;
          }
        })
        .filter((product) => product !== null);
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

    removeProduct: (state, action) => {
      state.cartData = state.cartData.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

    clearCart: (state) => {
      state.cartData = [];
      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

    getCartQuantity: (state) => {
      state.cartQuantity = state.cartData.reduce((qty, product) => {
        return qty + product.quantity;
      }, 0);
    },

    getCartPrice: (state) => {
      state.cartPrice = state.cartData.reduce((price, product) => {
        return price + product.totalPrice;
      }, 0);
    },

    getProductQuantity: (state, action) => {
      const productInCart = state.cartData.find(
        (product) => product.id === action.payload
      );
      state.productQuantity = productInCart ? productInCart.quantity : 0;
    },

    openCart: (state) => {
      state.isCartOpen = true;
    },

    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

export default cartSlice.reducer;
export const {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeProduct,
  clearCart,
  getCartQuantity,
  getCartPrice,
  getProductQuantity,
  openCart,
  closeCart,
} = cartSlice.actions;
