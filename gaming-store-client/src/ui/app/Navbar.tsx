import './Navbar.css';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

import { AppLogo } from './AppLogo';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useCallback } from 'react';
import { NavbarMenu } from './NavbarMenu';

export const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    const goToHomePage = useCallback(() => navigate('/'), []);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <div className="navbar-end">
                        <NavbarMenu>
                            <div className="user">
                                <Avatar className="avatar" />
                                <span>{user.name}</span>
                            </div>
                        </NavbarMenu>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
};
