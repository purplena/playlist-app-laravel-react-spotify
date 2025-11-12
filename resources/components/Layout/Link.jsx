import React from 'react';
import { Link as LinkRouterDom } from 'react-router-dom';
import LinkMui from '@mui/material/Link';

const Link = React.forwardRef(({ children, to, ...props }, ref) => {
  return (
    <LinkMui to={to} component={LinkRouterDom} ref={ref} {...props}>
      {children}
    </LinkMui>
  );
});

Link.displayName = 'Link';

export default Link;
