import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box, Stack } from '@mui/material';
import Footer from '../components/Layout/Footer';
import NavbarClient from '../components/Layout/Navbar';
import CustomLoader from '../components/Loader/Loader';
import { useCustomTheme } from '../helpers/useCustomTheme';
import { useGetCompany } from '../hooks/useGetCompany';

export default function Root() {
  const { company, isLoading } = useGetCompany();
  const theme = useCustomTheme({ company });

  return (
    <ThemeProvider theme={theme}>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Stack minHeight={'100vh'}>
          <Stack flex={1}>
            <NavbarClient />
            <Box
              paddingLeft={2}
              paddingRight={2}
              mt={6}
              id="main-container"
              maxWidth={500}
              ml={'auto'}
              mr={'auto'}
            >
              <Outlet />
            </Box>
          </Stack>
          <Footer
            sx={{
              marginTop: 'auto',
            }}
            company={company}
          />
        </Stack>
      )}
    </ThemeProvider>
  );
}
