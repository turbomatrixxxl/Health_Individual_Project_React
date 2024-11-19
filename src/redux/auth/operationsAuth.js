import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

// Set the base URL for axios
axios.defaults.baseURL = "http://localhost:5000";

// Function to set the Authorization header and store the token in localStorage
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem("token", token); // Save token in localStorage
};

// Function to clear the Authorization header and remove the token from localStorage
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem("token"); // Remove token from localStorage
};

// Thunk for logging in
export const logIn = createAsyncThunk(
  "auth/login", // Unique string identifier for this action
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", credentials);
      // console.log(response.data);

      setAuthHeader(response.data.token);
      return response.data; // Return the response data (user details and token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Thunk for registering
export const register = createAsyncThunk(
  "auth/register", // Unique string identifier for this action
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/signup", credentials);
      // console.log(response.data);

      setAuthHeader(response.data.token);
      return response.data; // Return the response data (user details and token)
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/api/users/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(token);
      const response = await axios.get("/api/users/current");
      // console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


