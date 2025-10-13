import { Stack, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { useGetCompany } from '../hooks/useGetCompany';
import { useCustomTheme } from '../helpers/useCustomTheme';
import { useEffect } from 'react';
import CustomLoader from '../components/Loader/Loader';


export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const isManagerRoute = location.pathname.startsWith("/manager");
  const { isLoading: isUserLoading } = useMe();
  const { company, isLoading: isCompanyLoading, errorStatus } = useGetCompany();
  const theme = useCustomTheme({ company });

  useEffect(() => {
    if(isManagerRoute) {
      console.log(isManagerRoute);
      navigate('/manager');
      return;
    }
      if (errorStatus === 404) {
        navigate("/");
      }
    }, [isManagerRoute, errorStatus, navigate ]);

    return  (isUserLoading || isCompanyLoading) ? (
    <Stack justifyContent="center" alignItems="center" mt={5}>
      <CustomLoader />
    </Stack>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}



