import './GamesList.css';

import { FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { BaseGame } from '../../providers';
import { GameDetails } from './GameDetails';

interface Props {
    games: BaseGame[];
    isLoading: boolean;
    title?: string;
    loadMore: () => void;
    onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
}

export const GamesList: FC<Props> = ({ games, title, isLoading, loadMore, onScroll }) => {
    return (
        <div className="games-list-wrapper" onScroll={onScroll}>
            {title && <h1>{title}</h1>}
            <div className="games-list">
                {games.map((game, index) => (
                    <GameDetails key={`${game.id}|${index}`} {...game} />
                ))}
            </div>
            <LoadingButton
                className="load-more-games"
                loading={isLoading}
                onClick={loadMore}
                variant="contained"
            >
                Load More Games
            </LoadingButton>
        </div>
    );
};
