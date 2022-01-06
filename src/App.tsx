import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { RequireAuth } from './pages/Auth';

/* color scheme */
// #C6FAD2 - light green
// #8882F4 - purple
// #F6FFEE - really light green
// #F48882 - red
// #FAD2CC - pink

const theme = createTheme({
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
      color: '#F48882 '
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      color: '#F48882 '
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

// export const url = "http://localhost:8080";
export const url = "https://doom-and-gloom-cvwo2022-api.herokuapp.com";

const queryClient = new QueryClient()

function App() {  
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />

        </Routes>
      </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
