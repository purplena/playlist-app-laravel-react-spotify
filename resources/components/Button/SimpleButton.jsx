import React from "react";
import { Button } from "@mui/material";

const SimpleButton = ({ variant, path = "", children }) => {
    return (
        <Button href={path} variant={variant}>
            {children}
        </Button>
    );
};
export default SimpleButton;
