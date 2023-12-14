import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Menu, MenuItem } from "@mui/material";
import { generatePath } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import {useNavigate} from "react-router";

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
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar
                    style={{ display: "flex", justifyContent: "space-between" }}
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
                        <Button href={generatePath("/login")} color="inherit">
                            Se connecter
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Menu
                style={{ top: "10px" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Box sx={{ width: "100vw" }}>
                    <MenuItem onClick={handleClose}>
                        <Link
                            underline="none"
                            href={generatePath("/:id/home", {
                                id: 1,
                            })}
                        >
                            Accueil
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link
                            underline="none"
                            href={generatePath("/:id/songs", {
                                id: 1,
                            })}
                        >
                            Chansons d'aujourd'hui
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link
                            underline="none"
                            href={generatePath("/:id/songs/search", {
                                id: 1,
                            })}
                        >
                            Suggérer une chanson
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        {user ? (
                            <Link underline="none" onClick={handleLogout}>
                                Se deconnecter
                            </Link>
                        ) : (
                            <Link
                                underline="none"
                                href={generatePath("/login")}
                            >
                                Se connecter/ S’inscrire
                            </Link>
                        )}
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    );
};

export default ButtonAppBar;
