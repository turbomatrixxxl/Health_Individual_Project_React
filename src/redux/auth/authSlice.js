import { createSlice } from "@reduxjs/toolkit";
import { logIn, register, logOut, refreshUser } from "./operationsAuth";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const handlePending = (state) => {
  state.user = null;
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = true;
  state.error = null;
  state.isRefreshing = false;
};

const handleRejected = (state, action) => {
  state.user = null;
  state.token = null;
  state.isLoggedIn = false;
  state.isLoading = false;
  state.error = action.payload;
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, { payload }) => {
        // console.log(payload.balance);

        state.user = payload.user;
        state.token = payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)

      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logOut.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = true;
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        // console.log(payload.balance);

        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
