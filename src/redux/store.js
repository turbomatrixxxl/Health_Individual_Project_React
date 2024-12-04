import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { publicCalculatorReducer } from "./public/publicCalculatorSlice";
import { privateReducer } from "./private/privateSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
    publicCalculatorSlice: publicCalculatorReducer,
    privateSlice: privateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this middleware
    }),
});
