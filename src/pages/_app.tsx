import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import theme from '@/styles/themePerso'

const App = ({ Component, pageProps }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <Component {...pageProps} />
  </MuiThemeProvider>
)

export default App
