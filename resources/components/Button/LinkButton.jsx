import React from 'react';
import { Button } from '@mui/material';
import { Link as LinkRouterDom } from 'react-router-dom';

const LinkButton = ({ variant = 'contained', to = '', children, ...props }) => {
  return (
    <Button
      disableElevation
      component={LinkRouterDom}
      to={to}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};
export default LinkButton;
