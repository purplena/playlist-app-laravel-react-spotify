import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import { CssBaseline } from '@mui/material';
import { CustomThemeProvider } from '../helpers/CustomThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CustomThemeProvider>
  </React.StrictMode>
);

export const apiUrl = import.meta.env.VITE_APP_URL;
