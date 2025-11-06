import React from 'react';
import { Link as LinkRouterDom } from 'react-router-dom';
import { Button } from '@mui/material';

const LinkButton = ({ variant = 'contained', to = '', children, ...props }) => {
  return (
    <Button
      disableElevation
      component={LinkRouterDom}
      to={to}
      variant={variant}
      sx={{
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&:hover': { boxShadow: 'none' },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
export default LinkButton;
