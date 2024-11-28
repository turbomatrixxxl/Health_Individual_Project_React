import { createSelector } from "reselect";

// Basic selector to get the slice of state
const selectPublicCalculatorState = (state) => state.publicCalculatorSlice;

// Memoized selector for formData
export const selectFormData = createSelector(
    [selectPublicCalculatorState],
    (publicCalculatorSlice) => ({
        height: publicCalculatorSlice.height,
        age: publicCalculatorSlice.age,
        currentWeight: publicCalculatorSlice.currentWeight,
        desiredWeight: publicCalculatorSlice.desiredWeight,
        bloodGroupIndex: publicCalculatorSlice.bloodGroupIndex,
    })
);

export const selectResult = (state) => state.publicCalculatorSlice.result;
export const selectLoading = (state) => state.publicCalculatorSlice.loading;
export const selectError = (state) => state.publicCalculatorSlice.error;
export const selectProducts = (state) => state.publicCalculatorSlice.products;
export const selectProduct = (state) => state.publicCalculatorSlice.product;
