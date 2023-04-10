import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createContacts,
  removeContacts,
  getContacts,
  updateContacts,
} from '../../servicesAPI/api';

export const fetchContacts = createAsyncThunk(
  '/contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.token;

      const contacts = await getContacts(persistedToken);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContacts = createAsyncThunk(
  '/contacts/addContacts',
  async (newContact, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.token;

      const contacts = await createContacts(newContact, persistedToken);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  '/contacts/deleteContacts',
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.token;

      const contacts = await removeContacts(contactId, persistedToken);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateItem = createAsyncThunk(
  '/contacts/updateItem',
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.user.token;

      const contacts = await updateContacts(contactId, persistedToken);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
