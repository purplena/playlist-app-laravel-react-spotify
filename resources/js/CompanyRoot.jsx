import React from 'react';
import CompanyNavbar from '../components/Layout/CompanyNavbar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function CompanyRoot() {
  return (
    <>
      <CompanyNavbar />
      <Box paddingLeft={2} paddingRight={2} mt={6} id="main-container">
        <Outlet />
      </Box>
    </>
  );
}
