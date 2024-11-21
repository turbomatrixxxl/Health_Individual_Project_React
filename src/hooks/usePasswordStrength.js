import { useState, useEffect } from "react";

const usePasswordStrength = (password) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculatePasswordStrength = (password) => {
      let strength = 0;

      if (password.length > 7) strength += 1;
      if (password.length > 10) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;

      return strength;
    };

    setStrength(calculatePasswordStrength(password));
  }, [password]);

  return strength;
};

export default usePasswordStrength;
