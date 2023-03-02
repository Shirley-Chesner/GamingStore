import { FC } from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from './pages/cartPage/CartPage';
import { GenrePage } from './pages/homePage/GenrePage';

import { HomePage } from './pages/homePage/HomePage';
import { AdminPage } from './pages/adminPage/AdminPage';
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
                user.email === "admin@admin.com" ? (
                <Routes>
                    <Route path="*" element={<AdminPage/>}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                </Routes> 
                ) : (
                    <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<HomePage />} />
                        <Route path="tags/:tag" element={<GenrePage />} />
                        <Route path="genres/:genre" element={<GenrePage />} />
                        <Route path="platforms/:platform" element={<GenrePage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                </Routes> 
                )
            ) : (
                <Routes>
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};
