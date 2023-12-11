import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import theme from "../helpers/createTheme";
import { ThemeProvider } from "@emotion/react";
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

export const apiUrl = import.meta.env.VITE_APP_URL;
