import { Alert } from '@mui/material';
import React, { useState } from 'react';

export const useForm = () => {
  const [errors, setErrors] = useState(null);

  function renderFieldError(field) {
    if (errors && Object.prototype.hasOwnProperty.call(errors, field)) {
      return errors[field][0] ? (
        <Alert severity="error">{errors[field][0]}</Alert>
      ) : null;
    }
    return null;
  }
  return {
    errors,
    setErrors,
    renderFieldError,
  };
};
