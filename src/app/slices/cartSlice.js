import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total: 0,
  cartIds: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    postCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 });
      state.total += parseInt(
        action.payload.price.$numberDecimal -
          (action.payload.price.$numberDecimal / 100) * action.payload.discount
      );
      state.cartIds.push(action.payload._id);
    },
    increaseQuantity: (state, action) => {
      state.cart.map((i) => {
        if (i._id === action.payload._id) {
          i.quantity += 1;
        }
      });
      state.total += parseInt(
        action.payload.price.$numberDecimal -
          (action.payload.price.$numberDecimal / 100) * action.payload.discount
      );
    },
    decreaseQuantity: (state, action) => {
      state.cart.map((i) => {
        if (i._id === action.payload._id) {
          if (i.quantity <= 1) {
            state.cart = state.cart.filter((i) => i._id !== action.payload._id);
            state.cartIds = state.cartIds.filter(
              (i) => i !== action.payload._id
            );
          } else {
            i.quantity -= 1;
          }
        }
      });
      state.total -= parseInt(
        action.payload.price.$numberDecimal -
          (action.payload.price.$numberDecimal / 100) * action.payload.discount
      );
    },
  },
});

export const { postCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
