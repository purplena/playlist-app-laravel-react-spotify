import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useLogout } from "../../hooks/useLogout";
import { generatePath, useNavigate } from "react-router-dom";
import MenuItemCustom from "../Menu/MenuItemCustom";

function CompanyNavbar() {
    let navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { user, logout } = useLogout();
    const handleLogout = async () => {
        const response = await logout();
        if (response?.data?.status) {
            navigate("/manager/login");
        }
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const menuItems = [
        {
            page: "Accueil",
            path: generatePath("/manager"),
        },
        {
            page: "Chansons d'aujourd'hui",
            path: generatePath("/manager/songs"),
        },
        {
            page: "Playlist",
            path: generatePath("/manager/playlist"),
        },
        {
            page: "Blacklist",
            path: generatePath("/manager/blacklist"),
        },
    ];

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {menuItems.map((menuItem) => (
                                <MenuItemCustom
                                    key={menuItem.page}
                                    path={menuItem.path}
                                    menuItem={menuItem.page}
                                    onClickHandler={handleCloseNavMenu}
                                />
                            ))}
                        </Menu>
                    </Box>
                    {/* Desktop */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {menuItems.map((menuItem) => (
                            <MenuItemCustom
                                key={menuItem.page}
                                path={menuItem.path}
                                menuItem={menuItem.page}
                                menuItemColor={"white"}
                            />
                        ))}
                    </Box>
                    {/* Desktop */}

                    {/* Login/Logout toggle  */}
                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <MenuItemCustom
                                menuItem={"Se deconnecter"}
                                menuItemColor={"white"}
                                onClickHandler={handleLogout}
                            />
                        ) : (
                            <MenuItemCustom
                                path={generatePath("/manager/login")}
                                menuItem={"Se connecter"}
                                menuItemColor={"white"}
                            />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default CompanyNavbar;
