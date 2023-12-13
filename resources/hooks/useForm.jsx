import { Alert } from "@mui/material";
import React, { useState } from "react";

export const useForm = () => {
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState("");

    function renderFieldError(field) {
        if (errors && errors.hasOwnProperty(field)) {
            return errors[field][0] ? (
                <Alert severity="error">{errors[field][0]}</Alert>
            ) : null;
        }
        return null;
    }
    return {
        errors,
        setErrors,
        message,
        setMessage,
        renderFieldError,
    };
};
