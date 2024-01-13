import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { useCustomTheme } from './useCustomTheme';

export const CustomThemeProvider = ({ children }) => {
  const theme = useCustomTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
