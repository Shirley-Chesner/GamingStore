import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from './login/LoginPage';
import { Navbar } from './Navbar';
import { HomePage } from './homePage/HomePage';
import { AuthProvider } from './providers/AuthProvider';

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
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
