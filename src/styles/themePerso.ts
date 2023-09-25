import { createTheme , Theme} from '@mui/material/styles'

const themePerso: Theme = createTheme({
  typography: {
    fontFamily: ['Philosopher', 'Roboto'].join(','),
  },
  palette: {
    primary: {
      main: '#4FD1C5', // vert foncé
      light: '#E0F2F1', // vert clair
      dark: '#009688', // vert foncé
    },
    secondary: {
      main: '#313860', // bleu lien
      light: '#F7F7F8', // gris clair
      dark: '#1A1D2E', // bleu foncé
    },
    grey : {
      500: '#E9E9E9', // bleu lien
    }

  },
  spacing: 8,
});

export default themePerso