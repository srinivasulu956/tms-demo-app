import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import '@progress/kendo-theme-material/dist/all.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';
import AuthProvider from './auth/AuthProvider';
import App from './App';

const theme = createTheme({
    palette: {
        primary: { main: '#1f4e79' },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <App />
                </AuthProvider>
                <ToastContainer position="top-right" autoClose={3000} />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);
