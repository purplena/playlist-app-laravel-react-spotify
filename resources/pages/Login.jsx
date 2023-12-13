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

    const handleLogin = async () => {
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
                    {message && <Alert severity="error">{message}</Alert>}
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                        textAlign="center"
                    >
                        <TextField
                            id="email"
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="password"
                            label="Mot de pass"
                            type="password"
                            variant="standard"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button variant="outlined" onClick={handleLogin}>
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
                    <SignUpButton
                        path={generatePath("/:id/signup", {
                            id: 1,
                        })}
                    />
                </Stack>
            </Stack>
        </>
    );
};
export default Login;
