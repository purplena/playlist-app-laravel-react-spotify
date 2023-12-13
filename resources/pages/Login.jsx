import React, { useState } from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";
import SignUpButton from "../components/Button/SignUpButton";
import { generatePath, useParams, useNavigate } from "react-router-dom";
import { apiUrl } from "../js/App";
import { useUserStore } from "../js/useUserStore";
import SocialMediaIconsColumn from "../components/Layout/SocialMediaIconsColumn";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();
    let navigate = useNavigate();
    const { setUser, user } = useUserStore();

    const handleLogin = async () => {
        // make request first to sanctum/csrf-cookie endpoint
        //to initialize CSRF protection for the application
        axios.get("/sanctum/csrf-cookie").then(() => {
            const payload = {
                email,
                password,
            };
            axios
                .post(`${apiUrl}/${id}/user/login`, payload, {
                    headers: { Accept: "application/json" },
                })
                .then((response) => {
                    console.log(response.data.user);
                    if (response.data.user) {
                        alert("Login success");
                        setUser(response.data.user);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
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
