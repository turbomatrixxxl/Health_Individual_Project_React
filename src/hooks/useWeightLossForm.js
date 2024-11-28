import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validate = (fieldName, value) => {
        let errorMessage = "";

        switch (fieldName) {
            case "height":
                if (!value) errorMessage = "Height is required";
                else if (value <= 0) errorMessage = "Height must be a positive number";
                break;

            case "age":
                if (!value) errorMessage = "Age is required";
                else if (value <= 0) errorMessage = "Age must be a positive number";
                break;

            case "currentWeight":
                if (!value) errorMessage = "Current weight is required";
                else if (value <= 0) errorMessage = "Current weight must be positive";
                break;

            case "desiredWeight":
                if (!value) errorMessage = "Desired weight is required";
                else if (value <= 0) errorMessage = "Desired weight must be positive";
                else if (Number(value) >= Number(values.currentWeight))
                    errorMessage = "Desired weight must be less than current weight";
                break;

            case "bloodType":
                if (!value) errorMessage = "Blood type is required";
                break;

            default:
                break;
        }

        return errorMessage;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" || type === "radio" ? checked || value : value;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validate(name, newValue),
        }));

        // Update form validity
        setIsValid(Object.values(errors).every((error) => !error) && newValue !== "");
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validate(name, value),
        }));
    };

    return {
        values,
        errors,
        isValid,
        handleChange,
        handleBlur,
    };
};


