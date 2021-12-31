import React from 'react';
import logo from './logo.svg';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

import SignUpPage from './pages/SignUpPage';

/* color scheme */
// #C6FAD2 - light green
// #DD9BCF - purple
// #F6FFEE - really light green
// #F48882 - red
// #FAD2CC - pink

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto, sans-serif',
      'Bebas Neue, cursive'
    ].join(','),
    h1: {
      fontFamily: 'Bebas Neue, cursive',
      color: '#ffffff'
    },
    h2: {
      fontFamily: 'Bebas Neue, cursive',
      color: '#ffffff'
    },
    h3: {
      fontFamily: 'Bebas Neue, cursive',
      color: '#F48882'
    },
    h4: {
      fontFamily: 'Bebas Neue, cursive',
      color: '#F48882'
    },
    h5: {
      fontFamily: 'Roboto, sans-serif',
      color: '#DD9BCF'
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      color: '#1b4'
    },
    subtitle1: {
      fontFamily: 'Roboto, sans-serif',
      color: '#F48882',
      fontStyle: 'italic'
    },
    button: {
      fontFamily: 'Roboto, sans-serif',
      color: '#F48882'
    }
  }
})

function App() {  
  return (
    <ThemeProvider theme={theme}>
      <SignUpPage />
    </ThemeProvider>
  );
}

export default App;
