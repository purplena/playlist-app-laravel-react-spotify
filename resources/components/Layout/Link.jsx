import React from 'react';
import LinkMui from '@mui/material/Link';
import { Link as LinkRouterDom } from 'react-router-dom';

const Link = React.forwardRef(({ children, to, ...props }, ref) => {
  return (
    <LinkMui to={to} component={LinkRouterDom} ref={ref} {...props}>
      {children}
    </LinkMui>
  );
});

Link.displayName = 'Link';

export default Link;
