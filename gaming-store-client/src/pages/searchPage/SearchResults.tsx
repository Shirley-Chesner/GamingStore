import React from "react";
import './SearchResults.css'

import { Card, CardActions, CardContent } from "@mui/material";
import { BaseGame } from "../../providers";


export const SearchResults: React.FC = () => {
    const [results, setResults] = React.useState<BaseGame[]>([]);


    return (
        <Card className="resultContainer">
            <CardContent>
            {(results.length != 0) ? <p>hello</p> : <span>No Results were found...</span>}
            </CardContent>
        
        </Card>
    )

}
