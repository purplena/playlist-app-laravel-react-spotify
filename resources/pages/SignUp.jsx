import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { signup, renderFieldError } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(email, password, username);
    };

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
                    spacing={2}
                    noValidate
                    autoComplete="off"
                    textAlign="center"
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    onSubmit={handleSubmit}
                >
                    {renderFieldError("email")}
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {renderFieldError("password")}
                    <TextField
                        id="password"
                        label="Mot de pass"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {renderFieldError("username")}
                    <TextField
                        id="username"
                        label="Nom d'utilisateur"
                        variant="standard"
                        helperText="optionel"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        endIcon={<SendIcon />}
                    >
                        S’inscrire
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};
export default SignUp;
