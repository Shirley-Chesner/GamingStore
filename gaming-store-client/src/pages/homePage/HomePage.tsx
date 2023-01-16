import './HomePage.css';

import { FC } from 'react';

import { parseToBaseGame } from '../../providers';
import { getGamesUrl, getGenres } from '../../providers/games/gamesProvider';
import { Carousel, GameDetails, usePageination, useFetch } from '../../ui';

export const HomePage: FC = () => {
    const { onScroll, results: games } = usePageination(getGamesUrl(), parseToBaseGame);
    const { value: genres, isLoading: loadingGenres } = useFetch(getGenres, []);
    const { value: tags, isLoading: loadingTags } = useFetch(() => getGenres(true), []);

    return (
        <div className="home-page">
            <Carousel
                title="Genres"
                items={genres}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingGenres}
            />
            <Carousel
                title="Tags"
                items={tags}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingTags}
            />
            <h1>Top Games</h1>
            <div className="home-page-games" onScroll={onScroll}>
                {games.map((game, index) => (
                    <GameDetails key={`${game.id}|${index}`} {...game} />
                ))}
            </div>
        </div>
    );
};
