import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { signup, errors } = useSignUp();
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signup(email, password, username);
        console.log(response);
        if (response?.data?.status) {
            navigate("/");
        }
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
                    <TextField
                        error={errors ? true : false}
                        style={{ width: "250px" }}
                        id="email"
                        label={errors ? "Error" : "Email"}
                        variant="standard"
                        value={email}
                        helperText={errors?.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        error={errors ? true : false}
                        style={{ width: "250px" }}
                        id="password"
                        label={errors ? "Error" : "Mot de passe"}
                        type="password"
                        variant="standard"
                        value={password}
                        helperText={errors?.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        error={errors?.username ? true : false}
                        style={{ width: "250px" }}
                        id="username"
                        label={errors?.username ? "Error" : "Username"}
                        variant="standard"
                        value={username}
                        helperText={
                            errors?.username ? errors?.username : "optionel"
                        }
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
