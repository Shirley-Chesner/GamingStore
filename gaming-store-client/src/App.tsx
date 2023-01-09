import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { LoginPage, SignUpPage } from './pages/login/LoginPage';
import { HomePage } from './pages/homePage/HomePage';
import { AuthProvider } from './providers/auth/AuthProvider';
import { Navbar } from './ui';

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
                    <Router>
                        <Routes>
                            <Route path="/" element={<Navbar />}>
                                <Route index element={<HomePage />} />
                            </Route>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
