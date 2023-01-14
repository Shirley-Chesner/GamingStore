import React from "react";
import './SearchPage.css'

import { TextInput } from "./../../ui/inputs/TextInput"
import { SearchCards } from "./SearchCards"
import { SearchResults } from "./SearchResults"

import { Grid }  from '@mui/material';
import { BaseGame } from "../../providers";
import { getGames } from '../../providers/games/gamesProvider';

export const SearchPage: React.FC = () => {
    const [priceVal, setPriceVal] = React.useState<number>(0);
    const [ratingVal, setRatingVal] = React.useState<number>(0);
    const [tagsVal, setTagsVal] = React.useState<string[]>([]);
    const [genreVal, setGenreVal] = React.useState<string[]>([]);
    const [results, setResults] = React.useState<BaseGame[]>([]);
    
    const onSearch = (value: string) => {
            console.log(value);       
    }

    const onPriceChange = (value: number) => {
        setPriceVal(value as number);
    }

    const onRatingChange = (value: number) => {
        setRatingVal(value as number);
    }

    const updateSearchedGames = async () => {
        if (tagsVal.length == 0 && genreVal.length == 0) {
            setResults([]);
        } else {
            const newSearchedGames = await getGames(tagsVal.join(), genreVal.join());
            setResults([...newSearchedGames]);
        }

    }

    const onTagsChange = async (tagName: string, isChecked: boolean) => {
        let newVals = tagsVal;
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(tagsVal.indexOf(tagName), 1);
        }
        setTagsVal([...newVals]);
        await updateSearchedGames();
    }

    const onGenreChange = async (tagName: string, isChecked: boolean) => {
        let newVals = genreVal;
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(genreVal.indexOf(tagName), 1);
        }
        setGenreVal([...newVals]);
        await updateSearchedGames();
    }

    return (
        <div>
            <Grid container className="searchPageGrid">
                <Grid item xs={2}>
                    <SearchCards handlePriceChange={onPriceChange} 
                                handleRatingChange={onRatingChange}
                                handleTagsChange={onTagsChange}
                                handleGenresChange={onGenreChange}/>
                </Grid>
                <Grid item xs={10} className="searchContent">
                    <TextInput className="searchBar" title="Search" outline onChange={onSearch}/>
                    <SearchResults searchedGames={results}/> 
                </Grid>
            </Grid>
        </div>
    );

}