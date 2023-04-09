import axios from "axios";

const BASE_URL = "https://connections-api.herokuapp.com";

export const signup = async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/signup`, userData);
    return data;
  } catch (error) {}
};
export const login = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/users/login`, userData);
  return data;
};
export const logout = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(`${BASE_URL}/users/logout`, null, config);
  return data;
};

export const current = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(`${BASE_URL}/users/current`, config);
  return data;
};

export const getContacts = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.get(`${BASE_URL}/contacts`, config);
  return data;
};

export const createContacts = async (newContact) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.post(`${BASE_URL}/contacts`, newContact, config);
  return data;
};

export const removeContacts = async (contactId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.delete(
    `${BASE_URL}/contacts/${contactId}`,
    config
  );
  return data;
};

// Maybe
export const updateContacts = async ({ contact, idContact }) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { data } = await axios.patch(
    `${BASE_URL}/contacts/${idContact}`,
    contact,
    config
  );
  return data;
};
