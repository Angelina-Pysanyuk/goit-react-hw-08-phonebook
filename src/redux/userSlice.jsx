import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, current, logout } from "servicesAPI/api";
import Notiflix from "notiflix";

export const createUser = createAsyncThunk(
  "/user/createUser",
  async (userData, thunkAPI) => {
    try {
      const response = await signup(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user.name);
      return response.user;
    } catch (error) {
      if (error.response.data?.code === 11000)
        Notiflix.Notify.failure("This email has already been registered", {
          position: "left-top",
          clickToClose: true,
        });
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/user/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await login(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user.name);
      return response.user;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const currentUser = createAsyncThunk(
  "/user/currentUser",
  async (token, thunkAPI) => {
    try {
      const response = await current(token);
      return response;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/user/logoutUser",
  async (token, thunkAPI) => {
    try {
      const response = await logout(token);
      localStorage.removeItem("token");
      return response;
    } catch (error) {
      if (!error.response) throw error;
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const localStoreUser = {
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { ...localStoreUser },
    error: "",
    loader: false,
    isAuth: false,
  },
  extraReducers: (builder) =>
    builder
      // SignIn
      .addCase(createUser.pending, (state) => {
        state.error = null;
        state.loader = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loader = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = { ...payload };
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // Current
      .addCase(currentUser.pending, (state) => {
        state.error = null;
        state.loader = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.isAuth = true;
        state.loader = false;
      })
      .addCase(currentUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loader = false;
      })
      // LogOut
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { ...localStoreUser };
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.error = payload;
      }),
});

export const userReducer = userSlice.reducer;
