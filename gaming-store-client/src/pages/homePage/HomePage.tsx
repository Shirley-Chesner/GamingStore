import './HomePage.css';

import { FC, useCallback } from 'react';

import { parseToBaseGame } from '../../providers';
import { getGames, getGamesUrl, getGenres } from '../../providers/games/gamesProvider';
import { Carousel, GameDetails, usePageination, useFetch } from '../../ui';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
    const navigate = useNavigate();

    const { onScroll, results: games } = usePageination(getGamesUrl(), parseToBaseGame);
    const { value: genres, isLoading: loadingGenres } = useFetch(getGenres, []);
    const { value: tags, isLoading: loadingTags } = useFetch(() => getGenres(true), []);
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

    return (
        <div className="home-page">
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
                onClickItem={goToGenrePage}
            />
            <Carousel
                title="Tags"
                items={tags}
                itemsInOneSlider={4}
                autoSlide
                isLoading={loadingTags}
                onClickItem={goToTagPage}
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
