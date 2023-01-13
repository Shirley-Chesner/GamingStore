import './Navbar.css';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Avatar, Button, MenuItem, Menu } from '@mui/material';

import { AppLogo } from './AppLogo';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { useCallback, useState } from 'react';
import { SpaOutlined } from '@mui/icons-material';

export const Navbar = () => {

    // Open the menu popover for the user
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigate = useNavigate();
    const { user, signOut } = useAuthContext();

    const goToHomePage = useCallback(() => navigate('/'), []);
    const goToSearchPage = useCallback(() => navigate('/search'), []);

    return (
        <>
            <div className="navbar">
                <AppLogo onClick={goToHomePage} />
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <div className="navbar-end">
                        <div className='userMenu'>
                            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button'}}>
                            <MenuItem onClick={() => {handleClose();}}>
                                    <span>View Profile</span>
                                </MenuItem>
                                <MenuItem onClick={() => {handleClose(); goToSearchPage()}}>
                                    <span>Search Games</span>
                                </MenuItem>
                                <MenuItem onClick={() => {handleClose()}}>
                                    <span>View Cart</span>
                                </MenuItem>
                                <MenuItem onClick={() => {handleClose()}}>
                                    <span>Wish List</span>
                                </MenuItem>
                                <MenuItem onClick={signOut}>
                                    <span>Sign Out</span>
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className="user">
                            <Button onClick={handleClick}><Avatar className="avatar" /></Button>
                            <span>{user.name}</span>
                        </div>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
};
