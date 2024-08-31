import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      paper: '#F2F2F7',
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
        color: "primary"
      }
    },
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
