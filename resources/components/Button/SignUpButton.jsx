import React from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SignUpButton = ({ path }) => {
    return (
        <Button href={path} variant="contained" endIcon={<SendIcon />}>
            S’inscrire
        </Button>
    );
};
export default SignUpButton;
