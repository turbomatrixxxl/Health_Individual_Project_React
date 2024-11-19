const validateRegister = (fields) => {
    const newErrors = {};
    if (!fields.username) {
        newErrors.username = "Username is required";
    }
    if (fields.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters!";
    }
    if (!fields.email) {
        newErrors.email = "Email is required";
    }
    if (!fields.password) {
        newErrors.password = "Password is required";
    }

    return newErrors;
};

export default validateRegister;
