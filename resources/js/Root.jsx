import React from "react";
import { CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useMe } from "../hooks/useMe";

export default function Root() {
    const { isLoading } = useMe();

    return isLoading ? <CircularProgress /> : <Outlet />;
}
