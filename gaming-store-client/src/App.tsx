import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage, SignUpPage } from './pages/login/LoginPage';
import { HomePage } from './pages/homePage/HomePage';
import { AuthProvider } from './providers/AuthProvider';
import { Navbar } from './ui';

function App() {
    return (
        <div className="gaming-store-app">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                            <Route index element={<HomePage />} />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
