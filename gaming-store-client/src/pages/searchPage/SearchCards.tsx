import React from "react";
import './SearchCards.css'

import { Card, 
        CardActions,
        CardContent,  
        Typography,  
        FormGroup, Slider, 
        FormControlLabel, 
        Checkbox, 
        Grid,
        Button } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { TextInput } from "./../../ui/inputs/TextInput"

export interface Props {
    handlePriceChange: (value: number) => void;
    handleRatingChange: (value: number) => void;
    handleTagsChange: (tagName: string, isChecked: boolean) => void;
    handleGenresChange: (tagName: string, isChecked: boolean) => void;
}

export const SearchCards: React.FC<Props> = ({handlePriceChange, handleRatingChange, handleTagsChange, handleGenresChange}) => {
    const [newTagVal, setNewTagVal] = React.useState<string>("");
    const [newTagCheckBoxVal, setNewTagCheckBoxVal] = React.useState<string>("");
    const [showNewTag, setShowNewTag] = React.useState<boolean>(false);

    const [newGenreVal, setNewGenreVal] = React.useState<string>("");
    const [newGenreCheckBoxVal, setNewGenreCheckBoxVal] = React.useState<string>("");
    const [showNewGenre, setShowNewGenre] = React.useState<boolean>(false);

    const newRatingVal = React.useRef<number>(-1);
    const isRatingChecked = React.useRef<boolean>(false);

    const onPriceChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        handlePriceChange(value as number);
    }

    const onRatingNumberChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        newRatingVal.current = value as number;
        if (isRatingChecked.current) {
            handleRatingChange(newRatingVal.current)
        }
    }

    const onRatingChange = (event: any) => {
        if (event.target.checked) {
            isRatingChecked.current = true;
            handleRatingChange(newRatingVal.current);
        } else {
            isRatingChecked.current = false;
            handleRatingChange(-1);
        }        
    }

    const onTagsChange = (event: any) => {
        let val: string = event.target.labels[0].innerText;
        val = val.replaceAll(' ', '-');
        handleTagsChange(val, event.target.checked);
    }

    const onGenresChange = (event: any) => {
        let val: string = event.target.labels[0].innerText;
        val = val.replaceAll(' ', '-');
        handleGenresChange(val, event.target.checked);
    }

    const onAddTag = () => {
        if (newTagVal.length != 0 ) {
            setShowNewTag(true);
            setNewTagCheckBoxVal(newTagVal);
        } else {
            setShowNewTag(false);
        }
        setNewTagVal("");
    }

    const onAddGenre = () => {
        if (newGenreVal.length != 0 ) {
            setShowNewGenre(true);
            setNewGenreCheckBoxVal(newGenreVal);
        } else {
            setShowNewGenre(false);
        }
        setNewGenreVal("");
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
                            {showNewTag && <FormControlLabel control={<Checkbox />} label={newTagCheckBoxVal} onChange={onTagsChange}/>}
                            <div className="addMoreTags">
                                <TextInput className="searchBarOfTags" title="Search for more" value={newTagVal} onChange={setNewTagVal}/>
                                <Button onClick={onAddTag}><CheckCircleIcon/></Button>
                            </div>
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
                            {showNewGenre && <FormControlLabel control={<Checkbox />} label={newGenreCheckBoxVal} onChange={onGenresChange}/>}
                            <div className="addMoreTags">
                                <TextInput className="searchBarOfTags" title="Search for more"  value={newGenreVal} onChange={setNewGenreVal}/>
                                <Button onClick={onAddGenre}><CheckCircleIcon/></Button>
                            </div>  
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
                            <FormControlLabel control={<Checkbox/>} label="Search" onChange={onRatingChange} />
                            <Slider aria-label="Temperature" 
                                    step={1} 
                                    marks 
                                    min={0} 
                                    max={5} 
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    className="ratingSlider"
                                    onChange={onRatingNumberChange}/>
                        </FormGroup>
                    </CardActions>
                </Card>
            </Grid>
            
        </Grid>
    )
}