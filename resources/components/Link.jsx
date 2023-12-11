import React from "react";
import LinkMui from '@mui/material/Link'
import {Link as LinkRouterDom} from 'react-router-dom'

const Link = ({ children, to }) => {
  return <LinkMui to={to} component={LinkRouterDom}>{children}</LinkMui>
}

export default Link;
