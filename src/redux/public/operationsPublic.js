import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for axios
axios.defaults.baseURL = "http://localhost:5000";

// Function to get calculation data using Axios
export const fetchCalculationData = createAsyncThunk(
    "calculation/fetchCalculationData", // Action type
    async (formData, { rejectWithValue }) => {
        const { height, desiredWeight, age, bloodGroupIndex, currentWeight } = formData;
        const url = `/api/public/${height}/${desiredWeight}/${age}/${bloodGroupIndex}/${currentWeight}`;

        try {
            const response = await axios.get(url);
            // console.log(response.data);

            return response.data; // Return the response data if successful
        } catch (error) {
            // Return the error message if the request fails
            return rejectWithValue(error.response?.data?.message || error.message); // More informative error handling
        }
    }
);

// Function to fetch all products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", // Action type
    async () => {
        try {
            const response = await axios.get("/api/public/products");
            // console.log(response.data);

            return response.data; // Return the response data
        } catch (error) {
            throw new Error("Failed to fetch products: " + error.message);
        }
    }
);

// Function to fetch a product by name
export const fetchProductByName = createAsyncThunk(
    "products/fetchProductByName", // Action type
    async (name) => {
        try {
            const response = await axios.get(`/api/public/products/${name}`);
            // console.log(response.data);

            return response.data; // Return the product data
        } catch (error) {
            throw new Error(`Failed to fetch product with name "${name}": ` + error.message);
        }
    }
);