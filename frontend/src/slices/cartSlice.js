import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItemAddedByUser = action.payload;
      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === newItemAddedByUser._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          if (cartItem._id === existItem._id) {
            return newItemAddedByUser;
          }
          return cartItem;
        });
      } else {
        state.cartItems = [...state.cartItems, newItemAddedByUser];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
