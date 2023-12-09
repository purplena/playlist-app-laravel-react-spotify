import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LoginSocialMediaIButton from "../components/LoginSocialMediaIButton";
import { Box, Stack, TextField, Typography } from "@mui/material";
import SignUpButton from "../components/SignUpButton";
import { generatePath } from "react-router-dom";

const Login = () => {
    const buttons = [
        {
            icon: <GoogleIcon />,
            mediaName: "GOOGLE",
        },
        {
            icon: <FacebookIcon />,
            mediaName: "FACEBOOK",
        },
        {
            icon: <TwitterIcon />,
            mediaName: "TWITTER",
        },
    ];

    return (
        <>
            <Stack direction="column" spacing={8}>
                <Stack direction="column" spacing={2}>
                    {buttons.map((button) => {
                        return (
                            <LoginSocialMediaIButton
                                key={button.mediaName}
                                {...button}
                            />
                        );
                    })}
                </Stack>
                <Stack
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h6" component="h1" textAlign="center">
                        Vous avez un mot de passe? Continuez avec votre email
                    </Typography>
                    <Box
                        component="form"
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
                        />
                        <TextField
                            id="password"
                            label="Mot de pass"
                            variant="standard"
                        />
                    </Box>
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
