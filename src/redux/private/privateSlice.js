import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPrivateCalculationData,
  addConsumedProductForSpecificDay,
  deleteConsumedProductForSpecificDay,
  fetchConsumedProductsForSpecificDay,
} from "./operationsPrivate";

const initialState = {
  user: null, // Centralized user data
  height: "",
  desiredWeight: "",
  age: "",
  bloodGroupIndex: "",
  currentWeight: "",
  recommendedDailyCaloriesIntake: 0,
  dailyCalorieSummary: {
    dailyCalorieIntake: 0,
    totalCaloriesConsumed: 0,
    remainingCalories: 0,
    percentageCaloriesConsumed: 0,
  },
  consumedProducts: [], // Products consumed on a specific day
  isLoading: false,
  error: null, // Tracks API errors
  message: null, // Success or info messages from API responses
};

const privateSlice = createSlice({
  name: "private",
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    setPrivateFormData: (state, action) => {
      const { name, value } = action.payload;
      if (name in state) {
        state[name] = value;
      }
    },
    resetPrivateForm: (state) => {
      state.height = "";
      state.desiredWeight = "";
      state.age = "";
      state.bloodGroupIndex = "";
      state.currentWeight = "";
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPrivateCalculationData
      .addCase(fetchPrivateCalculationData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrivateCalculationData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { recommendedDailyCaloriesIntake, user } = action.payload;
        state.user = user; // Update user information
        state.recommendedDailyCaloriesIntake = recommendedDailyCaloriesIntake; // Add daily calories intake to user
      })
      .addCase(fetchPrivateCalculationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle addConsumedProductForSpecificDay
      .addCase(addConsumedProductForSpecificDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addConsumedProductForSpecificDay.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, message } = action.payload;
        state.user = user; // Update user information
        state.message = message; // Add success message
      })
      .addCase(addConsumedProductForSpecificDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle deleteConsumedProductForSpecificDay
      .addCase(deleteConsumedProductForSpecificDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        deleteConsumedProductForSpecificDay.fulfilled,
        (state, action) => {
          const { message, user } = action.payload;

          state.isLoading = false;
          state.user = user;
          state.message = message;
          state.consumedProducts = user.consumedProducts;
        }
      )
      .addCase(
        deleteConsumedProductForSpecificDay.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      // Handle fetchConsumedProductsForSpecificDay
      .addCase(fetchConsumedProductsForSpecificDay.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchConsumedProductsForSpecificDay.fulfilled,
        (state, action) => {
          state.isLoading = false;
          const {
            dailyCalorieIntake,
            totalCaloriesConsumed,
            remainingCalories,
            percentageCaloriesConsumed,
            consumedProducts,
          } = action.payload;

          state.dailyCalorieSummary = {
            dailyCalorieIntake,
            totalCaloriesConsumed,
            remainingCalories,
            percentageCaloriesConsumed,
          };
          state.consumedProducts = consumedProducts;
        }
      )
      .addCase(
        fetchConsumedProductsForSpecificDay.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setPrivateFormData, resetPrivateForm, clearMessage } =
  privateSlice.actions;

export const privateReducer = privateSlice.reducer;
