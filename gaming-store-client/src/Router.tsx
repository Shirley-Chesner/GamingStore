import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { GenrePage } from './pages/homePage/GenrePage';

import { HomePage } from './pages/homePage/HomePage';
import { LoginPage, SignUpPage } from './pages/login/LoginPage';
import { PageNotFound } from './pages/PageNotFound';
import { SearchPage } from './pages/searchPage/SearchPage';
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
                        <Route path="tag/:tag" element={<GenrePage />} />
                        <Route path="genre/:genre" element={<GenrePage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
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
