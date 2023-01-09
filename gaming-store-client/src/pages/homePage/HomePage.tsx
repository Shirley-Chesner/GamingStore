import './HomePage.css';

import { FC, useEffect, useState } from 'react';

import type { BaseGame } from '../../providers';
import { getGames } from '../../providers/games/gamesProvider';
import { GameDetails } from '../../ui';

export const HomePage: FC = () => {
    const [games, setGames] = useState<BaseGame[]>([]);

    const fetchGames = async () => {
        setGames(await getGames());
    };

    useEffect(() => {
        fetchGames();
    }, []);

    return (
        <div className="home-page">
            <h1>I AM A HOME PAGE!!!</h1>
            <div className="home-page-games">
                {games.map((game) => (
                    <GameDetails key={game.id} {...game} />
                ))}
            </div>
        </div>
    );
};
