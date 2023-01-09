import './Navbar.css';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { AppLogo } from './AppLogo';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useCallback } from 'react';
import { TextInput } from '../inputs';

export const Navbar = () => {
    const navigate = useNavigate();
    const { user, signOut } = useAuthContext();

    const goToHomePage = useCallback(() => navigate('/'), []);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <div className="navbar-end">
                        <TextInput className="search-input" title="Search" outline />
                        <div className="user">
                            <Avatar className="avatar" />
                            <span>{user.name}</span>
                        </div>
                        <span className="sign-out-btn" onClick={signOut}>
                            Sign Out
                        </span>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
};
