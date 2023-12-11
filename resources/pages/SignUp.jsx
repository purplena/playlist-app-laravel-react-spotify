import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../js/App";
import { Stack, TextField, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import SignUpButton from "../components/Button/SignUpButton";
import { useParams } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(null);
    const { id } = useParams();

    const handleSubmit = async () => {
        // e.preventDefault();

        const response = await axios.post(`${apiUrl}/${id}/store`, {
            email,
            password,
            username,
        });
        return response.data;
    };

    // handleSubmit();

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
                    onSubmit={handleSubmit}
                >
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Mot de pass"
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        id="username"
                        label="Nom d'utilisateur"
                        variant="standard"
                        helperText="optionel"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <SignUpButton
                        path={generatePath("/:id/store", {
                            id: 1,
                        })}
                    />
                </Stack>
            </Stack>
        </>
    );
};
export default SignUp;
