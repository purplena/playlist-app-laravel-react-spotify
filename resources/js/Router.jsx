import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ClientRoot from "./ClientRoot";
import Home from "../pages/Home";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import SearchSong from "../pages/SearchSong";
import RequestedSongs from "../pages/RequestedSongs";
import SignUp from "../pages/SignUp";
import CompanySignUp from "../pages/CompanySignUp";
import CompanyRoot from "./CompanyRoot";
import CompanyLogin from "../pages/CompanyLogin";
import CompanyHome from "../pages/CompanyHome";
import ProtectedCompanyRoot from "./ProtectedCompanyRoot";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <ClientRoot />,
                children: [
                    {
                        path: "/",
                        element: <LandingPage />,
                    },
                    {
                        path: "/:id/home",
                        element: <Home />,
                    },
                    {
                        path: "/:id/songs",
                        element: <RequestedSongs />,
                    },
                    {
                        path: "/:id/songs/search",
                        element: <SearchSong />,
                    },
                    {
                        path: "/login",
                        element: <Login />,
                    },
                    {
                        path: "/signup",
                        element: <SignUp />,
                    },
                ],
            },
            {
                path: "/manager",
                element: <CompanyRoot />,
                children: [
                    {
                        path: "",
                        element: <ProtectedCompanyRoot />,
                        children: [
                            {
                                path: "",
                                element: <CompanyHome />,
                            },
                        ],
                    },
                    {
                        path: "login",
                        element: <CompanyLogin />,
                    },
                    {
                        path: "registration",
                        element: <CompanySignUp />,
                    },
                ],
            },
        ],
    },
]);
