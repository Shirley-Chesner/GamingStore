import './HomePage.css';

import { FC } from 'react';

import { BaseGame, parseToBaseGame } from '../../providers';
import { getGamesUrl } from '../../providers/games/gamesProvider';
import { GameDetails, usePageination } from '../../ui';

export const HomePage: FC = () => {
    const { onScroll, results: games } = usePageination<BaseGame>(getGamesUrl(), parseToBaseGame);

    return (
        <div className="home-page">
            <div className="home-page-games" onScroll={onScroll}>
                {games.map((game, index) => (
                    <GameDetails key={`${game.id}|${index}`} {...game} />
                ))}
            </div>
        </div>
    );
};
