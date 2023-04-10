import { createSlice } from '@reduxjs/toolkit';
import {
  addContacts,
  deleteContacts,
  fetchContacts,
  updateItem,
} from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  extraReducers: builder =>
    builder
      // Create
      .addCase(fetchContacts.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isLoading = false;
        state.items = [...payload];
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      // Add Contact
      .addCase(addContacts.pending, state => {
        state.error = null;
      })
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = [payload, ...state.items];
      })
      .addCase(addContacts.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Update
      .addCase(updateItem.pending, state => {
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = state.items.reduce((items, contact) => {
          if (contact.id === payload.id) {
            return [...items, { ...payload }];
          }
          return [...items, contact];
        }, []);
      })
      .addCase(updateItem.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Delete
      .addCase(deleteContacts.pending, state => {
        state.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = state.items.filter(contact => contact.id !== payload.id);
      })
      .addCase(deleteContacts.rejected, (state, { payload }) => {
        state.error = payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
