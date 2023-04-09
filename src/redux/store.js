import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactSlice";
import { userReducer } from "./userSlice";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
