import './HomePage.css';

import { FC, useEffect, useState } from 'react';

import { BaseGame, Genre, parseToBaseGame } from '../../providers';
import { getGamesUrl, getGenres } from '../../providers/games/gamesProvider';
import { Carousel, GameDetails, usePageination } from '../../ui';

export const HomePage: FC = () => {
    const { onScroll, results: games } = usePageination<BaseGame>(getGamesUrl(), parseToBaseGame);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [tags, setTags] = useState<Genre[]>([]);

    // add loading!!!
    useEffect(() => {
        const loadGenres = async () => {
            setGenres(await getGenres());
            setTags(await getGenres(true));
        };

        loadGenres();
    }, []);

    return (
        <div className="home-page">
            <Carousel items={genres} itemsInOneSlider={4} autoSlide />
            <Carousel items={tags} itemsInOneSlider={4} autoSlide />
            <h1>Top Games</h1>
            <div className="home-page-games" onScroll={onScroll}>
                {games.map((game, index) => (
                    <GameDetails key={`${game.id}|${index}`} {...game} />
                ))}
            </div>
        </div>
    );
};
