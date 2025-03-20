import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (amt) => (Math.round(amt * 100) / 100).toFixed(2);

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

      state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimal(state.itemsPrice) > 100 ? 0 : 10;

      state.taxPrice = addDecimal(Number(0.15 * state.itemsPrice));

      state.totalPrice =
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
