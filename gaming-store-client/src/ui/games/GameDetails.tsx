import './GameDetails.css';

import { FC } from 'react';
import classNames from 'classnames';
import Card from '@mui/material/Card';

import type { BaseGame } from '../../providers';
import { useNavigate } from 'react-router-dom';

type Props = BaseGame;

export const GameDetails: FC<Props> = ({
    added,
    id,
    imageUrl,
    metacritic,
    name,
    rating,
    price,
}) => {
    const navigate = useNavigate();
    return (
        <Card itemType="dark" className="game-details" onClick={() => navigate('/gameProfile')}>
            <img src={imageUrl} />
            <h3>{name}</h3>
            <div className="details">
                {metacritic && (
                    <span className={classNames('metacritic', _getRatingClassname(metacritic))}>
                        {metacritic}
                    </span>
                )}
                <span>Cost: {price}$</span>
                <span>{added}</span>
            </div>
        </Card>
    );
};

function _getRatingClassname(rating: number) {
    if (rating >= 80) return 'high';
    if (rating < 80 && rating >= 60) return 'mid';
    return 'low';
}
