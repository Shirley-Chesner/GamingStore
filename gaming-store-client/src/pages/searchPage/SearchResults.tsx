import React from "react";
import './SearchResults.css'

import { Card, CardContent, Grid } from "@mui/material";
import { BaseGame } from "../../providers";
import { GameDetails } from '../../ui';

export interface Props {
    searchedGames: BaseGame[];
}

export const SearchResults: React.FC<Props> = ({searchedGames}) => {

    return (
        <Card className="resultContainer">
            <CardContent className="SearchContent">
            {(searchedGames.length != 0) ?  
                <Grid container className="home-page-games" spacing={1}>
                        {searchedGames.map((game) => (
                        <Grid item xs={3}>
                            <GameDetails key={game.id} {...game} />
                        </Grid>
                        
                    ))}                 
                 </Grid>:
                <span>No Results were found...</span>}
            </CardContent>
        </Card>
    )

}
