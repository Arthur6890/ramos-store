import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#E9EDEC',
      paper: '#F5F7F6',
    },
    primary: {
      main: '#C81E3A',
      dark: '#9B1730',
      contrastText: '#F5F7F6',
    },
    text: {
      primary: '#1B1F2A',
      secondary: '#5B6460',
    },
    divider: '#C7CDC9',
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: 'var(--font-archivo), "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #C7CDC9',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #C7CDC9',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
})
