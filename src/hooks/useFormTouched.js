import { useState } from "react";

const useFormTouched = (initialState = {}) => {
  const [touched, setTouched] = useState(
    Object.keys(initialState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return {
    touched,
    handleBlur,
  };
};

export default useFormTouched;
