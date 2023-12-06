import React from "react";
import { Box, Button, Typography } from "@mui/material";
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
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
            </Box>
            <Box sx={{ marginTop: "5rem", textAlign: "center" }}>
                <Link href="#">Se connecter/ S’inscrire</Link>
            </Box>
        </>
    );
};
export default Home;
