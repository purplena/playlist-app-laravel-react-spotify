import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <Navbar />
            <Box
                sx={{
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    marginTop: "3rem",
                }}
                id="detail"
            >
                <Outlet />
            </Box>
        </>
    );
}
