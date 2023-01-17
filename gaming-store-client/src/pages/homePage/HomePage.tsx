import './HomePage.css';

import { FC, useCallback } from 'react';

import { parseToBaseGame } from '../../providers';
import { getGames, getGamesUrl, getGenres } from '../../providers/games/gamesProvider';
import { Carousel, usePageination, useFetch } from '../../ui';
import { useNavigate } from 'react-router-dom';
import { GamesList } from '../../ui/games/GamesList';

export const HomePage: FC = () => {
    const navigate = useNavigate();

    const {
        onScroll,
        loadMore,
        results: games,
        isLoading: loadingGames,
    } = usePageination(getGamesUrl({ search: 'god' }), parseToBaseGame);
    const { value: genres, isLoading: loadingGenres } = useFetch(getGenres, []);
    const { value: tags, isLoading: loadingTags } = useFetch(() => getGenres('tags'), []);
    const { value: platforms, isLoading: loadingPlatforms } = useFetch(
        () => getGenres('platforms'),
        [],
    );
    const { value: topGames, isLoading: loadingTopGames } = useFetch(
        () => getGames({ page_size: 10 }),
        [],
    );

    const goToGenrePage = useCallback((id: number) => {
        navigate(`genre/${id}`);
    }, []);

    const goToTagPage = useCallback((id: number) => {
        navigate(`tag/${id}`);
    }, []);

    const goToPlatformPage = useCallback((id: number) => {
        navigate(`platform/${id}`);
    }, []);

    return (
        <div className="home-page" onScroll={onScroll}>
            <Carousel
                className="top-games-carousel"
                title="Top Games"
                items={topGames}
                autoSlide
                isLoading={loadingTopGames}
            />
            <Carousel
                title="Genres"
                items={genres}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingGenres}
                randomColors
                onClickItem={goToGenrePage}
            />
            <Carousel
                title="Tags"
                items={tags}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingTags}
                randomColors
                onClickItem={goToTagPage}
            />
            <Carousel
                title="Platforms"
                items={platforms}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingPlatforms}
                randomColors
                onClickItem={goToPlatformPage}
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
