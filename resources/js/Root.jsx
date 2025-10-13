import { CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { useCustomTheme } from '../helpers/useCustomTheme';
import CustomLoader from '../components/Loader/Loader';


export default function Root() {
  const { isLoading } = useMe();
  const theme = useCustomTheme({});


    return  (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading ? <CustomLoader/> : <Outlet/>}
      </ThemeProvider>
    )
    
}



