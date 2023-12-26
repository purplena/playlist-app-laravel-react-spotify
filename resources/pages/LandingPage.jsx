import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { generatePath } from "react-router";
import LinkButton from "../components/Button/LinkButton";

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
            <Stack direction="column" spacing={1} textAlign={"right"}>
                {texts.map((text) => {
                    return (
                        <Typography key={text} variant="h5" component="h2">
                            {text}
                        </Typography>
                    );
                })}
            </Stack>

            <LinkButton
                disableElevation
                size="small"
                to={generatePath("/:id/home", {
                    id: 1,
                })}
            >
                Continuer
            </LinkButton>
        </Stack>
    );
};
export default LandingPage;
