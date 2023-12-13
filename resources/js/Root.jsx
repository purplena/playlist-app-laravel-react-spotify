import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Layout/Navbar";
import { Outlet, useParams } from "react-router-dom";
import { useUserStore } from "./useUserStore";
import { apiUrl } from "./App";

export default function Root() {
    const { setUser } = useUserStore();
    const { id } = useParams();

    useEffect(() => {
        axios.post(`${apiUrl}/${id}/user/me`).then((response) => {
            setUser(response.data.user);
            console.log(response.data.user);
        });
    }, []);

    return (
        <>
            <Navbar />
            <Box paddingLeft={2} paddingRight={2} mt={6} id="main-container">
                <Outlet />
            </Box>
        </>
    );
}
