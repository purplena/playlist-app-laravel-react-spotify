import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import SearchSong from "../pages/SearchSong";
import RequestedSongs from "../pages/RequestedSongs";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/home",
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
                path: "/:id/login",
                element: <Login />,
            },
            {
                path: "/:id/signup",
                element: <SignUp />,
            },
        ],
    },
]);
