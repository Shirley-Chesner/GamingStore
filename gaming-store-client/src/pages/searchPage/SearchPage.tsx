import React from "react";
import './SearchPage.css'

import { TextInput } from "./../../ui/inputs/TextInput"
import { SearchCards } from "./SearchCards"
import { SearchResults } from "./SearchResults"

import { Button, Grid }  from '@mui/material';
import { BaseGame } from "../../providers";
import { searchGames } from '../../providers/games/gamesProvider';
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";

export const SearchPage: React.FC = () => {
    const priceVal = React.useRef<number>(0);
    const ratingVal = React.useRef<number>(-1);
    const nameSearchVal = React.useRef<string>("");
    const [tagsVal, setTagsVal] = React.useState<string[]>([]);
    const [genreVal, setGenreVal] = React.useState<string[]>([]);
    const [results, setResults] = React.useState<BaseGame[]>([]);
    
    const onSearch = async () => {
        await updateSearchedGames();
    }

    const onPriceChange = (value: number) => {
        // DOTO: Price will be added when the games are pushed into the DB
        priceVal.current = value as number;
    }

    const onRatingChange = async (value: number) => {
        ratingVal.current = value;
        await updateSearchedGames();

    }

    const updateSearchedGames = async () => {
        console.log(nameSearchVal);
        if (tagsVal.length == 0 && genreVal.length == 0 && ratingVal.current == -1 && nameSearchVal.current == "") {
            setResults([]);
        } else {
            let newSearchedGames = await searchGames(tagsVal.join(), genreVal.join());           
            if (ratingVal.current != -1) {
                newSearchedGames = newSearchedGames.filter((game: BaseGame) => { 
                    if (game.rating <= ratingVal.current && game.rating > ratingVal.current - 1) 
                        return game;
                }) 
            }
            if (nameSearchVal.current != "") {
                newSearchedGames = newSearchedGames.filter((game: BaseGame) => {
                    console.log(game.name);
                    if (game.name.toLowerCase().includes(nameSearchVal.current.toLowerCase())) 
                        return game;
                })
            }
            setResults([...newSearchedGames]);
        }

    }

    const onTagsChange = async (tagName: string, isChecked: boolean) => {
        const newVals = [...tagsVal];
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(tagsVal.indexOf(tagName), 1);
        }
        setTagsVal(newVals);
        await updateSearchedGames();
    }

    const onGenreChange = async (tagName: string, isChecked: boolean) => {
        const newVals = [...genreVal];
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(genreVal.indexOf(tagName), 1);
        }
        setGenreVal(newVals);
        await updateSearchedGames();
    }

    return (
        <div className="search-page">
            <Grid container className="searchPageGrid">
                <Grid item xs={2}>
                    <SearchCards handlePriceChange={onPriceChange} 
                                handleRatingChange={onRatingChange}
                                handleTagsChange={onTagsChange}
                                handleGenresChange={onGenreChange}/>
                </Grid>
                <Grid item xs={10} className="searchContent">
                    <div className="searchArea">
                       <TextInput className="searchBar" title="Search" outline addSearchIcon onChange={(value) => nameSearchVal.current = value}/> 
                       <Button onClick={onSearch}>Search</Button>
                    </div>
                    <SearchResults searchedGames={results}/> 
                </Grid>
            </Grid>
        </div>
    );

}