import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import CompanyNavbar from '../components/Layout/CompanyNavbar';
// import { useMe } from '../hooks/useMe';
import { useCustomTheme } from '../helpers/useCustomTheme';
import { useStore } from './useStore';

export default function CompanyRoot() {
  const { user } = useStore();
  const company = user?.company;
  const theme = useCustomTheme({ company });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CompanyNavbar />
        <Box paddingLeft={4} paddingRight={4} mt={4} id="main-container" height={'100vh-64px'}>
          <Outlet />
        </Box>
      </ThemeProvider>
    </>
  );
}
