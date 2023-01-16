import './HomePage.css';

import { FC } from 'react';

import { parseToBaseGame } from '../../providers';
import { getGames, getGamesUrl, getGenreDetails } from '../../providers/games/gamesProvider';
import { Carousel, GameDetails, usePageination, useFetch } from '../../ui';
import { useParams } from 'react-router-dom';

export const GenrePage: FC = () => {
    const { genre, tag } = useParams();

    const { value: genreDetails } = useFetch(
        () => getGenreDetails(genre || tag || '', !!tag),
        undefined,
    );

    const { onScroll, results: games } = usePageination(
        getGamesUrl({ genres: genre, tags: tag }),
        parseToBaseGame,
    );

    const { value: topGames, isLoading: loadingTopGames } = useFetch(
        () =>
            getGames({
                page_size: 10,
                genres: genre,
                tags: tag,
            }),
        [],
    );

    if (!genreDetails) return <div>loading...</div>;

    return (
        <div
            className="home-page"
            style={{ backgroundImage: getBackgroundImage(genreDetails.imageUrl) }}
        >
            <h1 className="main-title">{genreDetails.name.toUpperCase()} GAMES</h1>
            <p
                className="home-page-description"
                dangerouslySetInnerHTML={{ __html: genreDetails.description }}
            />
            <Carousel
                className="top-games-carousel"
                title={`Top ${genreDetails.name} Games`}
                items={topGames}
                autoSlide
                isLoading={loadingTopGames}
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

function getBackgroundImage(src: string) {
    return `linear-gradient(to bottom, rgba(40, 44, 52, 0.8), rgba(40, 44, 52, 1)), url(${src})`;
}
