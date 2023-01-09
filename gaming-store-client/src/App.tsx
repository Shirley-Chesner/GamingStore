import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AuthProvider } from './providers/auth/AuthProvider';
import { Router } from './Router';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <div className="gaming-store-app">
            <AuthProvider>
                <ThemeProvider theme={darkTheme}>
                    <Router />
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
