import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import SearchSong from "../pages/SearchSong";
import RequestedSongs from "../pages/RequestedSongs";

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
                path: "/companies/:id/songs",
                element: <RequestedSongs />,
            },
            {
                path: "/companies/:id/songs/search",
                element: <SearchSong />,
            },
        ],
    },
]);
