import { MenuItem } from '@mui/material';

const MenuItemCustom = ({ path = '', label, onClickHandler, ...props }) => {
  return (
    <MenuItem
      onClick={onClickHandler}
      sx={{
        color: (theme) => theme.palette.text.primary,
        '&:hover': {
          backgroundColor: 'transparent',
          color: (theme) => theme.palette.text.primary,
        },
      }}
      {...props}
    >
      {label}
    </MenuItem>
  );
};

export default MenuItemCustom;
