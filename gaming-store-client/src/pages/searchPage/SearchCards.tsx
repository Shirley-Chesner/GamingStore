import React from "react";
import './SearchCards.css'

import { Card, 
        CardActions,
        CardContent,  
        Typography,  
        FormGroup, Slider, 
        FormControlLabel, 
        Checkbox, 
        Grid } from '@mui/material';

import { TextInput } from "./../../ui/inputs/TextInput"

export interface Props {
    handlePriceChange: (value: number) => void;
    handleRatingChange: (value: number) => void;
    handleTagsChange: (tagName: string, isChecked: boolean) => void;
    handleGenresChange: (tagName: string, isChecked: boolean) => void;
}

export const SearchCards: React.FC<Props> = ({handlePriceChange, handleRatingChange, handleTagsChange, handleGenresChange}) => {

    const onPriceChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        handlePriceChange(value as number);
    }

    const onRatingChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        handleRatingChange(value as number);
    }

    const onTagsChange = (event: any) => {
        handleTagsChange(event.target.labels[0].innerText, event.target.checked);
    }

    const onGenresChange = (event: any) => {
        handleGenresChange(event.target.labels[0].innerText, event.target.checked);
    }

    return (
        <Grid container spacing={2} className="cardsGrid" direction={"column"}>
            <Grid item xs={2}>
                <Card className="cardLayout">
                    <CardContent>
                        <Typography> Narrow By Tag: </Typography>
                    </CardContent>
                    <CardActions>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label="fantasy" onChange={onTagsChange} />
                            <FormControlLabel control={<Checkbox/>} label="singleplayer" onChange={onTagsChange}/>
                            <FormControlLabel control={<Checkbox/>} label="open world" onChange={onTagsChange}/>
                            <FormControlLabel control={<Checkbox/>} label="third person" onChange={onTagsChange}/>
                            <TextInput className="searchBarOfTags" title="Search for more"/>
                        </FormGroup>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card className="cardLayout">
                    <CardContent>
                        <Typography> Narrow By Genre: </Typography>
                    </CardContent>
                    <CardActions>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} label="adventure" onChange={onGenresChange} />
                            <FormControlLabel control={<Checkbox/>} label="platformer" onChange={onGenresChange}/>
                            <FormControlLabel control={<Checkbox/>} label="action" onChange={onGenresChange}/>
                            <FormControlLabel control={<Checkbox/>} label="RPG" onChange={onGenresChange}/>
                            <TextInput className="searchBarOfTags" title="Search for more"/>
                        </FormGroup>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <Card className="cardLayout">
                <CardContent>
                    <Typography> Narrow By Price: </Typography>
                </CardContent>
                <CardActions >
                    <div className="priceActions">                    
                        <Slider aria-label="Temperature"
                                step={20} 
                                marks 
                                min={0} 
                                max={100} 
                                defaultValue={50}
                                valueLabelDisplay="auto"
                                onChange={onPriceChange}/>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Special Offers" />
                        </FormGroup>
                    </div>
                </CardActions>
            </Card>
            </Grid>
            <Grid item xs={2}>
                <Card className="cardLayout">
                    <CardContent>
                        <Typography> Narrow By Rating: </Typography>
                    </CardContent>
                    <CardActions>
                        <FormGroup className="ratingSlider">
                            <Slider aria-label="Temperature" 
                                    step={1} 
                                    marks 
                                    min={0} 
                                    max={5} 
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    className="ratingSlider"
                                    onChange={onRatingChange}/>
                        </FormGroup>
                    </CardActions>
                </Card>
            </Grid>
            
        </Grid>
    )
}