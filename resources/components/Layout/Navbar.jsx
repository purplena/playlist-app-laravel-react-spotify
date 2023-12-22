import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Menu, MenuItem, Stack } from "@mui/material";
import { generatePath } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router";
import MenuItemCustom from "../Menu/MenuItemCustom";

const ButtonAppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useLogout();
    let navigate = useNavigate();

    const handleLogout = async () => {
        const response = await logout();
        if (response?.data?.status) {
            navigate("/");
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            page: "Accueil",
            path: generatePath("/:id/home", {
                id: 1,
            }),
        },
        {
            page: "Chansons d'aujourd'hui",
            path: generatePath("/:id/songs", { id: 1 }),
        },
        {
            page: "Suggérer une chanson",
            path: generatePath("/:id/songs/search", { id: 1 }),
        },
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            maxWidth: 500,
                            width: "100%",
                        }}
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        {user ? (
                            <Button onClick={handleLogout} color="inherit">
                                Se deconnecter
                            </Button>
                        ) : (
                            <Button
                                href={generatePath("/login")}
                                color="inherit"
                            >
                                Se connecter
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu
                style={{ top: "10px", maxWidth: 500 }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Box sx={{ width: "100vw", paddingRight: "1rem" }}>
                    {menuItems.map((menuItem) => (
                        <MenuItemCustom
                            key={menuItem.page}
                            path={menuItem.path}
                            menuItem={menuItem.page}
                            onClickHandler={handleClose}
                        />
                    ))}
                    {user ? (
                        <MenuItemCustom
                            menuItem={"Se deconnecter"}
                            onClickHandler={handleLogout}
                        />
                    ) : (
                        <MenuItemCustom
                            path={generatePath("/login")}
                            menuItem={"Se connecter"}
                            onClickHandler={handleClose}
                        />
                    )}
                </Box>
            </Menu>
        </Box>
    );
};

export default ButtonAppBar;
