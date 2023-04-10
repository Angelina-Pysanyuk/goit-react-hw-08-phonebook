import axios from 'axios';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

const BASE_URL = 'https://connections-api.herokuapp.com';

// User
export const signup = async userData => {
  const { data } = await axios.post(`${BASE_URL}/users/signup`, userData);
  setAuthHeader(data.token);
  return data;
};
export const login = async userData => {
  const { data } = await axios.post(`${BASE_URL}/users/login`, userData);
  setAuthHeader(data.token);
  return data;
};
export const logout = async () => {
  const { data } = await axios.post(`${BASE_URL}/users/logout`, null);
  clearAuthHeader();
  return data;
};

// Contacts
export const current = async token => {
  setAuthHeader(token);
  const { data } = await axios.get(`${BASE_URL}/users/current`);
  return data;
};

export const getContacts = async () => {
  const { data } = await axios.get(`${BASE_URL}/contacts`);
  return data;
};

export const createContacts = async newContact => {
  const { data } = await axios.post(`${BASE_URL}/contacts`, newContact);
  return data;
};

export const removeContacts = async contactId => {
  const { data } = await axios.delete(`${BASE_URL}/contacts/${contactId}`);
  return data;
};

export const updateContacts = async ({ contact, idContact }) => {
  const { data } = await axios.patch(
    `${BASE_URL}/contacts/${idContact}`,
    contact
  );
  return data;
};
