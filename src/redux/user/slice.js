import { createUser, loginUser, currentUser, logoutUser } from './operations';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    error: null,
    loader: false,
    isAuth: false,
    token: '',
  },
  extraReducers: builder =>
    builder
      // SignIn
      .addCase(createUser.pending, state => {
        state.error = null;
        state.loader = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.name = payload.user.name;
        state.email = payload.user.email;
        state.token = payload.token;
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // Login
      .addCase(loginUser.pending, state => {
        state.error = null;
        state.loader = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.name = payload.user.name;
        state.email = payload.user.email;
        state.token = payload.token;
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // Current
      .addCase(currentUser.pending, state => {
        state.error = null;
        state.loader = true;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // LogOut
      .addCase(logoutUser.pending, state => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.email = '';
        state.token = '';
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload;
      }),
});

export const userReducer = userSlice.reducer;
