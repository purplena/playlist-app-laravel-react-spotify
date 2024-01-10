import React from 'react';
import CompanyNavbar from '../components/Layout/CompanyNavbar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function CompanyRoot() {
  return (
    <>
      <CompanyNavbar />
      <Box
        paddingLeft={4}
        paddingRight={4}
        mt={4}
        id="main-container"
        height={'100vh-64px'}
      >
        <Outlet />
      </Box>
    </>
  );
}
