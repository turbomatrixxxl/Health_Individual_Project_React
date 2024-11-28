import { createSlice } from "@reduxjs/toolkit";
import { fetchCalculationData, fetchProducts, fetchProductByName } from "./operationsPublic";

const initialState = {
    height: "",
    desiredWeight: "",
    age: "",
    bloodGroupIndex: "",
    currentWeight: "",
    result: null, // Holds the response data from the API
    products: [], // Store all products
    product: [], // Store more products (when searched by name)
    loading: false,
    error: null,
};

const publicCalculatorSlice = createSlice({
    name: "publicCalculator",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { name, value } = action.payload;
            if (name in state) {
                state[name] = value;
            }
        },
        resetForm: (state) => {
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
            .addCase(fetchCalculationData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalculationData.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
                // console.log(action.payload);

            })
            .addCase(fetchCalculationData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch calculation data.";
            })

            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch products.";
            })

            .addCase(fetchProductByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductByName.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch product by name.";
            });
    },
});

export const { setFormData, resetForm } = publicCalculatorSlice.actions;

export const publicCalculatorReducer = publicCalculatorSlice.reducer;
