import React, { useEffect } from 'react';
import './SearchPage.css';

import { TextInput } from './../../ui/inputs/TextInput';
import { SearchCards } from './SearchCards';
import { SearchResults } from './SearchResults';

import { Button, Grid } from '@mui/material';
import { BaseGame, parseToFullGame } from '../../providers';
import { searchGames } from '../../providers/games/gamesProvider';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

export const SearchPage: React.FC = () => {
    const [priceVal, setPriceVal] = React.useState(0);
    const [ratingVal, setRatingVal] = React.useState(-1);
    const [nameSearchVal, setNameSearchVal] = React.useState('');
    const [tagsVal, setTagsVal] = React.useState<string[]>([]);
    const [genreVal, setGenreVal] = React.useState<string[]>([]);
    const [results, setResults] = React.useState<BaseGame[]>([]);

    const onSearch = async () => {
        await updateSearchedGames();
    };

    const onPriceChange = (value: number) => {
        // TODO: Price will be added when the games are pushed into the DB
        setPriceVal(value);
    };

    const onRatingChange = async (value: number) => {
        setRatingVal(value);
    };

    const updateSearchedGames = async () => {
        if (
            tagsVal.length === 0 &&
            genreVal.length === 0 &&
            ratingVal === -1 &&
            nameSearchVal === ''
        ) {
            setResults([]);
        } else {
            let newSearchedGames = await searchGames(tagsVal.join(), genreVal.join());
            if (ratingVal !== -1) {
                newSearchedGames = newSearchedGames.filter((game: BaseGame) => {
                    if (game.rating <= ratingVal && game.rating > ratingVal - 1) return game;
                });
            }
            if (nameSearchVal !== '') {
                newSearchedGames = newSearchedGames.filter((game: BaseGame) => {
                    console.log(game.name);
                    if (game.name.toLowerCase().includes(nameSearchVal.toLowerCase())) return game;
                });
            }

            const newNewArray = await Promise.all(
                newSearchedGames.map(async (item) => {
                    return structuredClone(await parseToFullGame(item));
                    // console.log(item);
                }),
            );
            // console.log(newSearchedGames);

            setResults(newNewArray);
        }
    };

    const onTagsChange = (tagName: string, isChecked: boolean) => {
        const newVals = [...tagsVal];
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(tagsVal.indexOf(tagName), 1);
        }
        setTagsVal(newVals);
    };

    const onGenreChange = (tagName: string, isChecked: boolean) => {
        const newVals = [...genreVal];
        if (isChecked) {
            newVals.push(tagName);
        } else {
            newVals.splice(genreVal.indexOf(tagName), 1);
        }
        setGenreVal(newVals);
    };

    useEffect(() => {
        updateSearchedGames();
    }, [genreVal, tagsVal, priceVal, ratingVal, nameSearchVal]);

    return (
        <div className="search-page">
            <Grid container className="searchPageGrid">
                <Grid item xs={2}>
                    <SearchCards
                        handlePriceChange={onPriceChange}
                        handleRatingChange={onRatingChange}
                        handleTagsChange={onTagsChange}
                        handleGenresChange={onGenreChange}
                    />
                </Grid>
                <Grid item xs={10} className="searchContent">
                    <div className="searchArea">
                        <TextInput
                            className="searchBar"
                            title="Search"
                            outline
                            addSearchIcon
                            onChange={setNameSearchVal}
                        />
                        <Button onClick={onSearch}>Search</Button>
                    </div>
                    <SearchResults searchedGames={results} />
                </Grid>
            </Grid>
        </div>
    );
};
