import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { HomePage } from './pages/homePage/HomePage';
import { LoginPage, SignUpPage } from './pages/login/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
import { useAuthContext } from './providers';
import { Navbar } from './ui';

export const Router: FC = () => {
    const { user, loading } = useAuthContext();

    // TODO: show user loading!!!!
    return (
        <BrowserRouter>
            {user ? (
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<HomePage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};
