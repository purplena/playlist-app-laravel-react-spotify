import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import Link from "../components/Link";

const Home = () => {
    const menuItems = [
        {
            title: "Sugérrez une chanson",
            href: generatePath("/:id/songs/search", { id: 1 }),
        },
        {
            title: "Chansons d'aujourd'hui",
            href: generatePath("/:id/songs", { id: 1 }),
        },
        { title: "Voir la carte", href: "#" },
    ];

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Typography variant="h1" component="h1">
                    Profitons de ce moment !
                </Typography>
                {menuItems.map((menuItem) => {
                    return (
                        <Button
                            key={menuItem.title}
                            variant="contained"
                            disableElevation
                            size="small"
                            href={menuItem.href}
                        >
                            {menuItem.title}
                        </Button>
                    );
                })}
            </Stack>
            <Box mt={10} textAlign={"center"}>
                <Link to="#">Se connecter/ S’inscrire</Link>
            </Box>
        </>
    );
};
export default Home;
