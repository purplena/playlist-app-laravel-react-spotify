import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import { Link, generatePath } from "react-router-dom";

const Home = () => {
    const menuItems = [
        { title: "Sugérrez une chanson", href: "#" },
        {
            title: "Chansons d'aujourd'hui",
            href: generatePath("/companies/:id/songs", { id: 1 }),
        },
        { title: "Voir la carte", href: "#" },
    ];

    return (
        <>
            <Stack
                direction="column"
                spacing={2}
            >
                <Typography variant="h4" component="h1">
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
            <Box
                mt={10}
                textAlign={"center"}
            >
                <Link to="#">Se connecter/ S’inscrire</Link>
            </Box>
        </>
    );
};
export default Home;
