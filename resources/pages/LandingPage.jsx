import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

const LandingPage = () => {
    const texts = [
        "proposer votre musique préférée?",
        "liker vos chansons préférées?",
        "consulter la carte?",
    ];

    return (
        <Stack direction="column" spacing={5}>
            <Typography variant="h4" component="h1">
                Êtes-vous prêt à
            </Typography>
            <Stack direction="column" spacing={1} textAlign={"right"} >
                {texts.map((text) => {
                    return (
                        <Typography key={text} variant="h5" component="h2">
                            {text}
                        </Typography>
                    );
                })}
            </Stack>

            <Button
                variant="contained"
                disableElevation
                size="small"
                href="/home"
            >
                Continuer
            </Button>
        </Stack>
    );
};
export default LandingPage;
