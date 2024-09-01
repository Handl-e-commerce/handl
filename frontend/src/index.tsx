import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#363636',
    },
    secondary: {
      main: '#F2E5D1',
    },
    background: {
      default: '#F2F2F7',
    },
    text: {
      primary: '#3C3C43',
      secondary: '#3C3C43',
      disabled: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
      }
    },
    MuiCssBaseline: {
      styleOverrides: () => `
        button {
          width: 90px;
          height: 32px;
        }
      `
    }
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
