const validateLogin = (fields) => {
    const errors = {};
    if (!fields.email) {
        errors.email = "Email is required";
    }
    if (!fields.password) {
        errors.password = "Password is required";
    }
    return errors;
};

export default validateLogin;
