import { createTheme } from '@mui/material/styles'

// Colors sampled directly from public/logo-oficial.png (the official crest).
// See docs/adr/0005-brand-assets-are-source-of-truth-for-visual-identity.md.
export const brand = {
  blue: '#489CCC',
  pink: '#E42478',
  ink: '#242424',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F7F7F5',
      paper: '#FFFFFF',
    },
    primary: {
      main: brand.blue,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: brand.pink,
      contrastText: '#FFFFFF',
    },
    text: {
      primary: brand.ink,
      secondary: '#66696C',
    },
    divider: '#E1E2E0',
  },
  shape: {
    borderRadius: 4,
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
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E1E2E0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #E1E2E0',
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
