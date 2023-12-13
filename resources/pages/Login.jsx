import React, { useState } from "react";
import { Stack, TextField, Typography, Button, Alert } from "@mui/material";
import SignUpButton from "../components/Button/SignUpButton";
import { generatePath } from "react-router-dom";
import SocialMediaIconsColumn from "../components/Layout/SocialMediaIconsColumn";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { message, login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <>
            <Stack direction="column" spacing={8}>
                <SocialMediaIconsColumn />
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h6" component="h1" textAlign="center">
                        Vous avez un mot de passe? Continuez avec votre email
                    </Typography>
                    <Stack
                        onSubmit={handleLogin}
                        component="form"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                        noValidate
                        autoComplete="off"
                        textAlign="center"
                    >
                        {message && <Alert severity="error">{message}</Alert>}
                        <TextField
                            style={{ width: "250px" }}
                            id="email"
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            style={{ width: "250px" }}
                            id="password"
                            label="Mot de pass"
                            type="password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="outlined">
                            Se connecter
                        </Button>
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Typography
                        variant="body1"
                        component="h1"
                        textAlign="center"
                    >
                        Pas de compte? Inscrivez-vous s'il vous plaît
                    </Typography>
                    <SignUpButton path={generatePath("/signup")} />
                </Stack>
            </Stack>
        </>
    );
};
export default Login;
