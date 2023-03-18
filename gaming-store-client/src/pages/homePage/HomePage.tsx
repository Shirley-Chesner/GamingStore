import './HomePage.css';

import { FC, useCallback } from 'react';

import { parseToGameWithPrice } from '../../providers';
import { ExtraData, getGames, getGamesUrl, getGenres } from '../../providers/games/gamesProvider';
import { Carousel, usePageination, useFetch, capitalize } from '../../ui';
import { useNavigate } from 'react-router-dom';
import { GamesList } from '../../ui/games/GamesList';

export const HomePage: FC = () => {
    const {
        onScroll,
        loadMore,
        results: games,
        isLoading: loadingGames,
    } = usePageination(getGamesUrl(), parseToGameWithPrice);

    const { value: topGames, isLoading: loadingTopGames } = useFetch(
        () => getGames({ page_size: 10 }),
        [],
    );

    return (
        <div className="home-page" onScroll={onScroll}>
            <Carousel
                className="top-games-carousel"
                title="Top Games"
                items={topGames}
                autoSlide
                isLoading={loadingTopGames}
            />
            <GenericCarousel type="genres" />
            <GenericCarousel type="tags" />
            <GenericCarousel type="platforms" />
            <BasicCarousel
                name="new this week"
                getValue={() => getGames({ dates: _getWeekDates(), page_size: 12 })}
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

const GenericCarousel: FC<{ type: ExtraData }> = ({ type }) => {
    const navigate = useNavigate();

    const onClick = useCallback((id: number) => {
        navigate(`${type}/${id}`);
    }, []);

    return <BasicCarousel name={type} getValue={() => getGenres(type)} onClick={onClick} />;
};

interface BasicProps {
    name: string;
    getValue: () => Promise<any>;
    onClick?: (id: number) => void;
}

const BasicCarousel: FC<BasicProps> = ({ name, getValue, onClick }) => {
    const { value, isLoading } = useFetch(() => getValue(), []);
    return (
        <Carousel
            title={capitalize(name)}
            items={value}
            itemsInOneSlider={4}
            autoSlide
            isLoading={isLoading}
            randomColors
            onClickItem={onClick}
        />
    );
};

const _getWeekDates = () => {
    const now = new Date();

    return [new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now];
};
