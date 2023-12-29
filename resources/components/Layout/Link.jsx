import React from 'react';
import LinkMui from '@mui/material/Link';
import { Link as LinkRouterDom } from 'react-router-dom';

const Link = ({ children, to, ...props }) => {
  return (
    <LinkMui to={to} component={LinkRouterDom} {...props}>
      {children}
    </LinkMui>
  );
};

export default Link;
