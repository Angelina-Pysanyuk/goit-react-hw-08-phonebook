import { createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, currentUser, logoutUser } from './userSlice';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    setLoader(state, { payload }) {
      state = payload;
    },
  },
  extraReducers: builder =>
    builder
      // SignIn
      .addCase(createUser.pending, () => true)
      .addCase(createUser.fulfilled, () => false)
      .addCase(createUser.rejected, () => false)
      // Login
      .addCase(loginUser.pending, () => true)
      .addCase(loginUser.fulfilled, () => false)
      .addCase(loginUser.rejected, () => false)
      // Current
      .addCase(currentUser.pending, () => true)
      .addCase(currentUser.fulfilled, () => false)
      .addCase(currentUser.rejected, () => false)
      // LogOut
      .addCase(logoutUser.pending, () => true)
      .addCase(logoutUser.fulfilled, () => false)
      .addCase(logoutUser.rejected, () => false),
});

export const { setLoader } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
