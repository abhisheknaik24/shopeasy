import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    postUser: (state, action) => {
      state.user = action.payload;
    },
    postAddresses: (state, action) => {
      state.user.addresses = action.payload;
    },
  },
});

export const { postUser, postAddresses } = userSlice.actions;

export default userSlice.reducer;
