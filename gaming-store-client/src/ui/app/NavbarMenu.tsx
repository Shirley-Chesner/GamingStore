import { Menu, MenuItem } from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../providers';

export const NavbarMenu: FC<PropsWithChildren> = ({ children }) => {
    const navigate = useNavigate();
    const { signOut } = useAuthContext();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onClose = (url?: string) => {
        setAnchorEl(null);
        if (url) navigate(url);
    };

    return (
        <>
            <div className="userMenu">
                <Menu anchorEl={anchorEl} open={open} onClose={() => onClose()}>
                    <MenuItem onClick={() => onClose()}>
                        <span>View Profile</span>
                    </MenuItem>
                    <MenuItem onClick={() => onClose('/search')}>
                        <span>Search Games</span>
                    </MenuItem>
                    <MenuItem onClick={() => onClose()}>
                        <span>View Cart</span>
                    </MenuItem>
                    <MenuItem onClick={() => onClose()}>
                        <span>Wish List</span>
                    </MenuItem>
                    <MenuItem onClick={signOut}>
                        <span>Sign Out</span>
                    </MenuItem>
                </Menu>
            </div>
            <div onClick={onClick}>{children}</div>
        </>
    );
};
