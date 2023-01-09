import './Navbar.css';

import { Link, Outlet } from 'react-router-dom';
import { AppLogo } from './AppLogo';
import { useAuthContext } from '../../providers/AuthProvider';

export const Navbar = () => {
    const { user, signOut } = useAuthContext();

    return (
        <>
            <div className="navbar">
                <AppLogo />
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <span className="sign-out-btn" onClick={signOut}>
                        Sign Out
                    </span>
                )}
            </div>
            <Outlet />
        </>
    );
};
