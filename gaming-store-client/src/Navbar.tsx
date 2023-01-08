import './Navbar.css';

import { Link, Outlet } from 'react-router-dom';
import { AppLogo } from './ui';

export const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <AppLogo />
                <Link to="/login">Login</Link>
            </div>
            <Outlet />
        </>
    );
};
