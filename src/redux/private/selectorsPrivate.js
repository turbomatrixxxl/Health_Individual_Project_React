import { createSelector } from "reselect";

// Basic selector to get the slice of state
const selectPrivateState = (state) => state.privateSlice;

// Memoized selector for formData
export const selectPrivateFormData = createSelector(
  [selectPrivateState],
  (privateSlice) => ({
    height: privateSlice.height,
    age: privateSlice.age,
    currentWeight: privateSlice.currentWeight,
    desiredWeight: privateSlice.desiredWeight,
    bloodGroupIndex: privateSlice.bloodGroupIndex,
  })
);

export const selectRecommendedDailyCaloriesIntake = (state) =>
  state.privateSlice.recommendedDailyCaloriesIntake;

export const selectUser = (state) => state.privateSlice.user;

export const selectDailyCalorieSummary = (state) =>
  state.privateSlice.dailyCalorieSummary;

export const selectConsumedProducts = (state) =>
  state.privateSlice.consumedProducts;

export const selectPrivateStatus = (state) => state.privateSlice.isLoading;

export const selectPrivateError = (state) => state.privateSlice.error;

export const selectPrivateMessage = (state) => state.privateSlice.message;

export const selectRemainingCalories = (state) =>
  state.privateSlice.dailyCalorieSummary?.remainingCalories;

export const selectTotalCaloriesConsumed = (state) =>
  state.privateSlice.dailyCalorieSummary?.totalCaloriesConsumed;

export const selectPercentageCaloriesConsumed = (state) =>
  state.privateSlice.dailyCalorieSummary?.percentageCaloriesConsumed;
