import { signup, login, current, logout } from '../../servicesAPI/api';
import Notiflix from 'notiflix';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk(
  '/user/createUser',
  async (userData, thunkAPI) => {
    try {
      const response = await signup(userData);
      return response;
    } catch (error) {
      if (error.response.data?.code === 11000)
        Notiflix.Notify.failure('This email has already been registered', {
          position: 'left-top',
          clickToClose: true,
        });
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  '/user/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await login(userData);
      return response;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  '/user/currentUser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.token;
      if (!persistedToken) {
        // If there is no token, exit without performing any request
        return thunkAPI.rejectWithValue('Unable to fetch user');
      }
      const response = await current(persistedToken);
      return response;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  '/user/logoutUser',
  async (token, thunkAPI) => {
    try {
      const response = await logout(token);
      return response;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
