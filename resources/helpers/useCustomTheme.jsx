import { createTheme, responsiveFontSizes } from '@mui/material';
import { useGetCompany } from '../hooks/useGetCompany';

export const useCustomTheme = () => {
  const { company } = useGetCompany();

  const primaryColor = company?.background_color ?? '#cff86e';
  const contrastingFontColor = company?.font_color ?? '#000000';

  let theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      text: {
        primary: '#000000',
        secondary: contrastingFontColor,
      },
      background: {
        default: '#fefefe',
      },
    },

    breakpoints: {
      values: {
        xxs: 0,
        xs: 350,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      h1: {
        fontFamily: 'Prata, sans-serif',
        fontSize: '2.75rem',
      },
      h2: {
        fontFamily: 'Prata, sans-serif',
      },
      h3: {
        fontFamily: 'Prata, sans-serif',
      },
      h4: {
        fontFamily: 'Prata, sans-serif',
      },
      h5: {
        fontFamily: 'Prata, sans-serif',
      },
      h6: {
        fontFamily: 'Prata, sans-serif',
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: contrastingFontColor,
            '&:hover': {
              backgroundColor: primaryColor.dark,
              color: '#ffffff',
            },
          },
          outlined: {
            color: '#000000',
            borderColor: '#000000',
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: primaryColor,
            },
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return theme;
};
