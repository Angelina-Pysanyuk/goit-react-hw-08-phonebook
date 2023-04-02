import { configureStore } from '@reduxjs/toolkit';
// import { contactsReducer } from './contactSlice';
import { userReducer } from './userSlice';
import { loaderReducer } from './loaderSlice';
// import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    // contacts: contactsReducer,
    // filter: filterReducer,
  },
});
