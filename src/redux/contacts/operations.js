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
      const contacts = await getContacts();
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
      const contacts = await createContacts(newContact);
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
      const contacts = await removeContacts(contactId);
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
      const contacts = await updateContacts(contactId);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
