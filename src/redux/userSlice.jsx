import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signup, login, current, logout } from 'servicesAPI/api';
import Notiflix from 'notiflix';

export const createUser = createAsyncThunk(
  '/user/createUser',
  async userData => {
    try {
      const response = await signup(userData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.name);
      return response.user;
    } catch (error) {
      if (error.response.data?.code === 11000)
        Notiflix.Notify.failure('This email has already been registered', {
          position: 'left-top',
          clickToClose: true,
        });
      console.log(error);
      // if (!error.response) throw error;
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk('/user/loginUser', async userData => {
  try {
    const response = await login(userData);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', response.user.name);
    return response.user;
  } catch (error) {
    console.log(error);
    // if (!error.response) throw error;
    // return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const currentUser = createAsyncThunk(
  '/user/currentUser',
  async token => {
    try {
      const response = await current(token);
      return response.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutUser = createAsyncThunk('/user/logoutUser', async token => {
  try {
    const response = await logout(token);
    localStorage.removeItem('token');
    return response;
  } catch (error) {
    console.log(error);
  }
});

const localStoreUser = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { ...localStoreUser },
    error: '',
    isAuth: false,
  },
  extraReducers: builder =>
    builder
      // SignIn
      .addCase(createUser.pending, state => {
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isAuth = true;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Login
      .addCase(loginUser.pending, state => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Current
      .addCase(currentUser.pending, state => {
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isAuth = true;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // LogOut
      .addCase(logoutUser.pending, state => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = { ...localStoreUser };
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload;
      }),
});

export const userReducer = userSlice.reducer;
