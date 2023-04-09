import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createContacts,
  removeContacts,
  getContacts,
  updateContacts,
} from "servicesAPI/api";

export const fetchContacts = createAsyncThunk(
  "/contacts/getContacts",
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
  "/contacts/addContacts",
  async (newContact, idContact, thunkAPI) => {
    try {
      const contacts = await createContacts(newContact, idContact);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  "/contacts/deleteContacts",
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
  "/contacts/updateItem",
  async (contactId, thunkAPI) => {
    try {
      const contacts = await updateContacts(contactId);
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    deleteContact(state, action) {
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },

  extraReducers: (builder) =>
    builder
      // Create
      .addCase(fetchContacts.pending, (state) => {
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
      .addCase(addContacts.pending, (state) => {
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
      .addCase(updateItem.pending, (state) => {
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
      .addCase(deleteContacts.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.error = null;
        state.items = state.items.filter(
          (contact) => contact.id !== payload.id
        );
      })
      .addCase(deleteContacts.rejected, (state, { payload }) => {
        state.error = payload;
      }),
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
