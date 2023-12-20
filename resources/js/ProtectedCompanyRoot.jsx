import React, { useEffect } from "react";
import CompanyNavbar from "../components/Layout/CompanyNavbar";
import { Box } from "@mui/material";
import { Outlet, generatePath, redirect, useNavigate } from "react-router-dom";
import { useUserStore } from "./useUserStore";

export default function ProtectedCompanyRoot() {
    const { user } = useUserStore();
    let navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate(generatePath("/manager/login"));
        } else if (user.role != 1) {
            navigate(generatePath("/"));
        }
    }, [user]);

    if (!user || user.role != 1) {
        return;
    }

    return <Outlet />;
}
