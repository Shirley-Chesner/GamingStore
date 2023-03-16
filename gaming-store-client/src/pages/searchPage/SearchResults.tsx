import React from 'react';
import './SearchResults.css';

import { Card, CardContent, Grid } from '@mui/material';
import { BaseGame } from '../../providers';
import { GameDetails } from '../../ui';

export interface Props {
    searchedGames: BaseGame[];
}

export const SearchResults: React.FC<Props> = ({ searchedGames }) => {
    return (
        <Card className="resultContainer">
            <CardContent className="SearchContent">
<<<<<<< HEAD
                {searchedGames.length != 0 ? (
                    <Grid container className="home-page-games" spacing={1}>
                        {searchedGames.map((game, i) => (
                            <Grid item xs={3} key={`${i}`}>
                                <GameDetails key={game.id} {...game} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <span>No Results were found...</span>
                )}
=======
                {
                    (searchedGames.length != 0) ?
                    <div className="resultsList">
                       {searchedGames.map((game) => ( <GameDetails key={`${game.id}-result`} {...game} />))}
                    </div> : <span>No Results were found...</span>
                }
>>>>>>> 70f6970d5d9063b0ada6535771d69c8aba5e2d79
            </CardContent>
        </Card>
    );
};
