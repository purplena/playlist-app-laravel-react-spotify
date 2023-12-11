import {createTheme, responsiveFontSizes} from "@mui/material";

const theme = createTheme({
  palette: {
    mode: 'light',
    // mode: 'dark',
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
    h1: {
      fontFamily: "Russo One, sans-serif",
      fontSize: "4rem"
    },
    h2: {
      fontFamily: "Russo One, sans-serif",
    },
    h3: {
      fontFamily: "Russo One, sans-serif",
    },
    h4: {
      fontFamily: "Russo One, sans-serif",
    }
  },
  components: {
    MuiAppBar: {
      '& .MuiMenu-list' : {
        padding: 0
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontFamily: "Open Sans, sans-serif",
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);
