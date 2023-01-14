import React from "react";
import './SearchPage.css'

import { TextInput } from "./../../ui/inputs/TextInput"
import { SearchCards } from "./SearchCards"
import { SearchResults } from "./SearchResults"

import { Grid }  from '@mui/material';
import { BaseGame } from "../../providers";

export const SearchPage: React.FC = () => {
    
    const onSearch = (value: string) => {
            console.log(value);       
    }

    return (
        <div>
            <Grid container className="searchPageGrid">
                <Grid item xs={2}>
                    <SearchCards/>
                </Grid>
                <Grid item xs={10} className="searchContent">
                    <TextInput className="searchBar" title="Search" outline onChange={onSearch}/>
                    <SearchResults/> 
                </Grid>
            </Grid>
        </div>
    );

}