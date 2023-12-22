import React, { useEffect } from "react";
import CompanyNavbar from "../components/Layout/CompanyNavbar";
import { Box } from "@mui/material";
import { Outlet, generatePath, redirect, useNavigate } from "react-router-dom";
import { useUserStore } from "./useUserStore";

export default function ProtectedCompanyRoot() {
    const { user } = useUserStore();
    let navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        if (!user) {
            console.log("No user found");
            navigate(generatePath("/manager/login"));
        } else if (user.role != 1) {
            console.log("User does not have required role");
            navigate(generatePath("/"));
        }
    }, [user]);

    if (!user || user.role != 1) {
        return;
    }

    return <Outlet />;
}
