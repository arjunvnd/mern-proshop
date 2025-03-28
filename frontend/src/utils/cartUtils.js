export const addDecimal = (amt) => (Math.round(amt * 100) / 100).toFixed(2);

export const updateCart = (state) => {
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
  return state;
};
