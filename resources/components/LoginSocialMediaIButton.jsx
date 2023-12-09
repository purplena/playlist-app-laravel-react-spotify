import React from "react";
import { Button } from "@mui/material";

const LoginSocialMediaIButton = ({ icon, mediaName }) => {
    return (
        <Button variant="outlined" startIcon={icon}>
            Continue avec {mediaName}
        </Button>
    );
};
export default LoginSocialMediaIButton;
