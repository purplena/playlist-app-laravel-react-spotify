import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '@mui/material';
import { generatePath, useParams } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate, useLocation } from 'react-router';
import MenuItemCustom from '../Menu/MenuItemCustom';

const ButtonAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data?.status) {
      navigate('/');
    }
  };

  const { id } = useParams();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirection = () => {
    navigate('/login', { state: { from: location } });
  };

  const handleCloseAndRedirection = () => {
    navigate('/login', { state: { from: location } });
    setAnchorEl(null);
  };

  const menuItems = [
    {
      page: 'Accueil',
      path: generatePath('/:id/home', { id }),
    },
    {
      page: "Chansons d'aujourd'hui",
      path: generatePath('/:id/songs', { id }),
    },
    {
      page: 'Suggérer une chanson',
      path: generatePath('/:id/songs/search', { id }),
    },
  ];

  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: 500,
              width: '100%',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
            </IconButton>
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
              <Button
                variant="text"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: (theme) => theme.palette.text.secondary,
                    fontWeight: 800,
                  },
                }}
                onClick={handleRedirection}
              >
                Se connecter
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        style={{ top: '10px', maxWidth: 500 }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box sx={{ width: '100vw', paddingRight: '1rem' }}>
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
              menuItem={'Se deconnecter'}
              onClickHandler={handleLogout}
            />
          ) : (
            <Button
              onClick={handleCloseAndRedirection}
              sx={{
                color: (theme) => theme.palette.text.primary,
                backgroundColor: 'transparent',
                textTransform: 'capitalize',
                fontSize: '1rem',
                paddingLeft: '16px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: 800,
                },
              }}
            >
              Se connecter
            </Button>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default ButtonAppBar;
