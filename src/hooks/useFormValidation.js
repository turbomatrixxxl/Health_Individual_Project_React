import { useState } from "react";

const useFormValidation = (initialState, validateFn) => {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = validateFn(fields);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    fields,
    setFields,
    errors,
    validateFields,
  };
};

export default useFormValidation;
