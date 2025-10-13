import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useLogout } from '../../hooks/useLogout';
import { generatePath, useNavigate } from 'react-router-dom';
import MenuItemCustom from '../Menu/MenuItemCustom';
import { Button } from '@mui/material';
import LinkButton from '../Button/LinkButton';

function CompanyNavbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user, logout } = useLogout();

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data?.status) {
      navigate('/manager/login');
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
      page: 'Accueil',
      path: generatePath('/manager'),
    },

    {
      page: 'Entreprise',
      path: generatePath('/manager/entreprise'),
    },
    {
      page: "Chansons d'aujourd'hui",
      path: generatePath('/manager/songs'),
    },
    {
      page: 'Blacklist',
      path: generatePath('/manager/blacklist'),
    },
    {
      page: 'Carte',
      path: generatePath('/manager/carte'),
    },
  ];

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  '&:hover': {
                    color: (theme) => theme.palette.text.secondary,
                  },
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              PaperProps={{
                style: {
                  width: '100%',
                },
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                top: '4px',
              }}
            >
              {/* {menuItems.map((menuItem) => (
                <MenuItemCustom
                  key={menuItem.page}
                  path={menuItem.path}
                  menuItem={menuItem.page}
                  onClickHandler={handleCloseNavMenu}
                  sx={{
                    fontWeight: location.pathname === menuItem.path ? 800 : '',
                  }}
                />
              ))} */}
            </Menu>
          </Box>
          {/* Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {menuItems.map((menuItem) => (
              <LinkButton
                key={menuItem.page}
                to={menuItem.path}
                sx={{
                  fontWeight: location.pathname === menuItem.path ? 800 : '',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: 800,
                  },
                }}
              >
                {menuItem.page}
              </LinkButton>

              // <MenuItemCustom
              //   key={menuItem.page}
              //   path={menuItem.path}
              //   menuItem={menuItem.page}
              // />
            ))}
          </Box>
          {/* Desktop */}

          {/* Login/Logout toggle  */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Button
                onClick={handleLogout}
                color="inherit"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: 800,
                  },
                }}
              >
                Se deconnecter
              </Button>
            ) : (
              ''
              // <MenuItemCustom
              //   path={generatePath('/manager/login')}
              //   menuItem={'Se connecter'}
              //   sx={{
              //     color: (theme) => theme.palette.text.secondary,
              //     '&:hover': {
              //       color: (theme) => theme.palette.text.secondary,
              //     },
              //   }}
              // />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CompanyNavbar;
