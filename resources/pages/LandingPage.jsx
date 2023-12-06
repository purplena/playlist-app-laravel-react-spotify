import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LandingPage = () => {
    const texts = [
        "proposer votre musique préférée?",
        "liker vos chansons préférées?",
        "consulter la carte?",
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
            }}
        >
            <Typography variant="h4" component="h1">
                Êtes-vous prêt à
            </Typography>
            <Box sx={{ textAlign: "right" }}>
                {texts.map((text) => {
                    return (
                        <Typography key={text} variant="h4" component="h2">
                            {text}
                        </Typography>
                    );
                })}
            </Box>

            <Button
                variant="contained"
                disableElevation
                size="small"
                href="/home"
            >
                Continuer
            </Button>
        </Box>
    );
};
export default LandingPage;
