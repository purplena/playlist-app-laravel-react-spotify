import { useState } from "react";

export const useForm = () => {
    const [errors, setErrors] = useState(null);

    function renderFieldError(field) {
        if (errors && errors.hasOwnProperty(field)) {
            return errors[field][0] ? errors[field][0] : null;
        }
        return null;
    }
    return {
        errors,
        setErrors,
        renderFieldError,
    };
};
