import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '@mui/material';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate, useLocation } from 'react-router';
import MenuItemCustom from '../Menu/MenuItemCustom';
import { useStore } from '../../js/useStore';

const ButtonAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const { company } = useStore();
  const companySlug = company.slug;

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data?.status) {
      navigate('/');
    }
  };

  const handleClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogin = () => {
    navigate(`/${companySlug}/login`, { state: { from: location } });
    handleClose();
  }

  const handleNavigate = (path) => {
    handleClose();
    navigate(path)
  }

  const menuItems = [
    {
      label: 'Accueil',
      path: `/${companySlug}`,
    },
    {
      label: "Chansons d'aujourd'hui",
      path: `/${companySlug}/songs`,
    },
    {
      label: 'Suggérer une chanson',
      path: `/${companySlug}/songs/search`,
    },
  ];


  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 'none' }}>
        <Toolbar 
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              maxWidth: 500,
              width: '100%',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
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
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        style={{ top: '5px', maxWidth: 500, width: '100%' }}
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
              key={menuItem.label}
              label={menuItem.label}
              onClickHandler={() => handleNavigate(menuItem.path)}
              sx={{
                fontWeight: location.pathname === menuItem.path ? 800 : '',
              }}
            />
          ))}
          {user ? (
            <MenuItemCustom
              label={'Se deconnecter'}
              onClickHandler={handleLogout}
            />
          ) : (
            <MenuItemCustom
              label={'Se connecter'}
              onClickHandler={handleLogin}
            />

          )}
        </Box>
      </Menu>
      </>
  );
};

export default ButtonAppBar;
