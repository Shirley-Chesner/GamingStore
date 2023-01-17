import React from "react";
import './SearchResults.css'

import { Card, CardContent } from "@mui/material";
import { BaseGame } from "../../providers";
import { GameDetails } from '../../ui';

export interface Props {
    searchedGames: BaseGame[];
}

export const SearchResults: React.FC<Props> = ({searchedGames}) => {

    return (
        <Card className="resultContainer">
            <CardContent className="SearchContent">
                {
                    (searchedGames.length != 0) ?
                    <div className="resultsList">
                       {searchedGames.map((game) => ( <GameDetails key={`${game.id}-result`} {...game} />))}
                    </div> : <span>No Results were found...</span>
                }
            </CardContent>
        </Card>
    )

}
