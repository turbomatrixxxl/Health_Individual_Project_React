import { createSlice } from "@reduxjs/toolkit";
import { logIn, register, logOut, refreshUser, resendVerificationEmail } from "./operationsAuth";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRegistered: false,
  isRefreshing: false,
  error: null,
  isLoggedOut: true,
  emailResendStatus: null, // New state for resend email
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;

  // Only clear user and token if it's a critical operation like login/register
  if (!state.isLoggedIn) {
    state.user = null;
    state.token = null;
  }

  state.isRefreshing = false; // Ensure this reflects the operation's context
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;

  // If the rejection invalidates the session, clear user and token
  if (!state.isRefreshing) {
    state.user = null;
    state.token = null;
    state.isLoggedIn = false;
  }

  state.isRefreshing = false;
};


const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Log In
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        // console.log(payload.user);

        if (payload.user.verify === false) {
          // If not verified, clear token and prevent login
          state.token = null;
          state.isLoggedIn = false;
        } else {
          state.token = payload.token;
          state.isLoggedIn = true;
        }
        state.isLoggedOut = false;
        state.isRegistered = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logIn.rejected, handleRejected)

      // Register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload.user;

        if (state.user.verify) {
          state.isLoggedOut = false;
        }

        state.isRegistered = true
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)


      // Log Out
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state, { payload }) => {
        const token = JSON.parse(localStorage.getItem("token"))
        const { message, data } = payload

        console.log("Logout slice message:", message);
        console.log("Logout slice data:", data);

        if (token) {
          localStorage.setItem("token", null)
        }

        if (!token || token === null) {
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;
          state.isLoading = false;
          state.error = null;
          state.isRegistered = false;
        }

        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
        state.isRegistered = false;
        state.isLoggedOut = true
      })
      .addCase(logOut.rejected, handleRejected)

      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        // console.log(state.user);


        if (payload.verify === false) {
          // If not verified, ensure user is not logged in
          state.token = null;
          state.isLoggedIn = false;
          state.isLoggedOut = true
        } else {
          state.isLoggedIn = true;
          state.isLoggedOut = false
        }

        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user = null;
      })

      // Resend Verification Email
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailResendStatus = null;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, { payload }) => {
        state.emailResendStatus = payload; // Success message
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailResendStatus = null; // Reset resend status on error
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

