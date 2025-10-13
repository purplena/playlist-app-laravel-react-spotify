import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import MenuItemCustom from '../Menu/MenuItemCustom';
import { useStore } from '../../js/useStore';

function CompanyNavbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useStore();
  const { logout } = useLogout();

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

  const handleNavigate = (path) => {
    handleCloseNavMenu();
    navigate(path)
  }

  const menuItems = [
    {
      label: 'Accueil',
      path: '/manager',
    },
    {
      label: 'Entreprise',
      path: '/manager/entreprise',
    },
    {
      label: "Chansons d'aujourd'hui",
      path: '/manager/songs',
    },
    {
      label: 'Blacklist',
      path: '/manager/blacklist',
    },
    {
      label: 'Carte',
      path: '/manager/carte',
    },
  ];

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user?.role === 1 && (
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
                {menuItems.map((menuItem) => (
                  <MenuItemCustom
                    key={menuItem.label}
                    label={menuItem.label}
                    onClickHandler={() => handleNavigate(menuItem.path)}
                    sx={{
                      fontWeight: location.pathname === menuItem.path ? 800 : '',
                    }}
                  />
                ))}
                <MenuItemCustom
                  label={'Se deconnecter'}
                  onClickHandler={handleLogout}
                  sx={{}}
                />
              </Menu>
          </Box>
          )}

          {/* Desktop */}
          {user?.role === 1 && <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: { xxs: 'none', xs: 'none', md: 'flex' },
            }}
          >
            {menuItems.map((menuItem) => (
              <MenuItemCustom
                  key={menuItem.label}
                  label={menuItem.label}
                  onClickHandler={() => handleNavigate(menuItem.path)}
                  sx={{
                    fontWeight: location.pathname === menuItem.path ? 800 : '',
                  }}
                />
            ))}
            <MenuItemCustom
                label={'Se deconnecter'}
                onClickHandler={handleLogout}
                sx={{}}
              />
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CompanyNavbar;
