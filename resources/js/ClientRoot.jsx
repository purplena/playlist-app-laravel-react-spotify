import { Box, Stack } from '@mui/material';
import NavbarClient from '../components/Layout/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import { useStore } from './useStore';

export default function Root() {
  const {company} = useStore(); 

  return (
    <>
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
    </>
  )
}
