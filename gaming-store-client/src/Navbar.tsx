import './Navbar.css';

import { Link, Outlet } from 'react-router-dom';

export const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <div>Cool Title</div>

                <Link to="/login">Login</Link>
            </div>
            <Outlet />
        </>
    );
};
