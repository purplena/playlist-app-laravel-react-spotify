import React from "react";
import { Button } from "@mui/material";

const LoginSocialMediaButton = ({ icon, mediaName }) => {
    return (
        <Button variant="outlined" startIcon={icon}>
            Continue avec {mediaName}
        </Button>
    );
};
export default LoginSocialMediaButton;
