import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CustomLoader from '../components/Loader/Loader';
import { useCustomTheme } from '../helpers/useCustomTheme';
import { useMe } from '../hooks/useMe';

export default function Root() {
  const { isLoading } = useMe();
  const theme = useCustomTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading ? <CustomLoader /> : <Outlet />}
    </ThemeProvider>
  );
}
