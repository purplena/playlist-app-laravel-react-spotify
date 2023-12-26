import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { generatePath } from "react-router-dom";
import Link from "../components/Layout/Link";
import LinkButton from "../components/Button/LinkButton";

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
                <Typography variant="h4" component="h1">
                    Profitons de ce moment !
                </Typography>
                {menuItems.map((menuItem) => {
                    return (
                        <LinkButton
                            key={menuItem.title}
                            disableElevation
                            size="small"
                            to={menuItem.href}
                            width="100%"
                        >
                            {menuItem.title}
                        </LinkButton>
                    );
                })}
            </Stack>
            <Box mt={10} textAlign={"center"}>
                <Link underline="none" to={generatePath("/login")}>
                    Se connecter/ S’inscrire
                </Link>
            </Box>
        </>
    );
};
export default Home;
