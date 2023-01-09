import './AppLogo.css';

import { FC } from 'react';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import classNames from 'classnames';

interface Props {
    hideTitle?: boolean;
    small?: boolean;
    className?: string;
    onClick?: () => void;
}

export const AppLogo: FC<Props> = ({ hideTitle, small, className, onClick }) => {
    return (
        <div
            className={classNames('app-logo', className, { small, click: !!onClick })}
            onClick={onClick}
        >
            <SportsEsportsIcon fontSize={small ? 'medium' : 'large'} />
            {!hideTitle ? <h2 className="app-logo-title">Gaming Store</h2> : null}
        </div>
    );
};
