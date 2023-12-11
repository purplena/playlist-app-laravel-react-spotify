import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, Paper } from "@mui/material";
import { generatePath } from "react-router-dom";
import Link from "../components/Link";

const ButtonAppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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
                    <Button
                        href={generatePath("/:id/login", {
                            id: 1,
                        })}
                        color="inherit"
                    >
                        Se connecter
                    </Button>
                </Toolbar>
            </AppBar>
            <Menu
                style={{ top: "10px"}}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{
                    "& .MuiMenu-list": {
                        padding: 0
                    }
                }}
            >
                <Box sx={{ width: "100vw" }}>
                    <MenuItem onClick={handleClose}>
                        <Link to="/home">Accueil</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link
                            to={generatePath("/:id/songs", {
                                id: 1,
                            })}
                        >
                            Chansons d'aujourd'hui
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link
                            to={generatePath("/:id/songs/search", {
                                id: 1,
                            })}
                        >
                            Suggérer une chanson
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link
                            to={generatePath("/:id/login", {
                                id: 1,
                            })}
                        >
                            Se connecter/ S’inscrire
                        </Link>
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    );
};

export default ButtonAppBar;
