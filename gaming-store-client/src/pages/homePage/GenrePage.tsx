import './HomePage.css';

import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { parseToBaseGame } from '../../providers';
import { getGames, getGamesUrl, getGenreDetails } from '../../providers/games/gamesProvider';
import { Carousel, usePageination, useFetch } from '../../ui';
import { GamesList } from '../../ui/games/GamesList';

export const GenrePage: FC = () => {
    const { genre, tag, platform } = useParams();

    const { value: genreDetails } = useFetch(
        () =>
            getGenreDetails(
                genre || tag || platform || '',
                tag ? 'tags' : platform ? 'platforms' : 'genres',
            ),
        undefined,
    );

    const {
        onScroll,
        results: games,
        isLoading: loadingGames,
        loadMore,
    } = usePageination(
        getGamesUrl({ genres: genre, tags: tag, platforms: platform }),
        parseToBaseGame,
    );

    const { value: topGames, isLoading: loadingTopGames } = useFetch(
        () =>
            getGames({
                page_size: 10,
                genres: genre,
                tags: tag,
                platforms: platform,
            }),
        [],
    );

    if (!genreDetails)
        return (
            <div className="home-page">
                <Skeleton className="main-title" variant="text" width="100%" height="3em" />
                <Skeleton
                    className="home-page-description"
                    variant="text"
                    width="100%"
                    height="10em"
                />
                <Carousel
                    title={<Skeleton variant="text" width="50%" height="3em" />}
                    items={[]}
                    isLoading
                    className="top-games-carousel"
                />
            </div>
        );

    return (
        <div
            className="home-page"
            onScroll={onScroll}
            style={{ backgroundImage: getBackgroundImage(genreDetails.imageUrl) }}
        >
            <h1 className="main-title">{genreDetails.name.toUpperCase()} GAMES</h1>
            <span
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
            <GamesList
                title="Top Games"
                games={games}
                isLoading={loadingGames}
                loadMore={loadMore}
            />
        </div>
    );
};

function getBackgroundImage(src: string) {
    return `linear-gradient(to bottom, rgba(40, 44, 52, 0.8), rgba(40, 44, 52, 1)), url(${src})`;
}
