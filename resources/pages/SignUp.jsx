import React from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import SignUpButton from "../components/SignUpButton";

const SignUp = () => {
    return (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h5" component="h1" textAlign="center">
                    Vous êtes presque là!
                </Typography>
                <Typography variant="body1" component="h2" textAlign="center">
                    Nous vous invitons de créer votre compte
                </Typography>
                <Stack
                    component="form"
                    sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                    textAlign="center"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    <TextField id="email" label="Email" variant="standard" />
                    <TextField
                        id="password"
                        label="Mot de pass"
                        variant="standard"
                    />
                    <TextField
                        id="username"
                        label="Nom d'utilisateur"
                        variant="standard"
                        helperText="optionel"
                    />
                    <SignUpButton
                        path={generatePath("/:id/#", {
                            id: 1,
                        })}
                    />
                </Stack>
            </Stack>
        </>
    );
};
export default SignUp;
