import React from "react";
import { Button } from "@mui/material";

const SimpleButton = ({ variant, path, message }) => {
    return (
        <Button href={path} variant={variant}>
            {message}
        </Button>
    );
};
export default SimpleButton;
