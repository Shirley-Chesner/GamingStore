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

export const SearchCards: React.FC = () => {
    const [priceVal, setPriceVal] = React.useState<number>(0);
    const [ratingVal, setRatingVal] = React.useState<number>(0);

    const onPriceChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        setPriceVal(value as number);
    }

    const onRatingChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        setRatingVal(value as number);
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
                            <FormControlLabel control={<Checkbox/>} label="Fantasy" />
                            <FormControlLabel control={<Checkbox/>} label="Adventure" />
                            <FormControlLabel control={<Checkbox/>} label="Strategy" />
                            <FormControlLabel control={<Checkbox/>} label="puzzle" />
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
                                value={priceVal} 
                                onChange={onPriceChange} 
                                step={20} 
                                marks 
                                min={0} 
                                max={100} 
                                defaultValue={50}
                                valueLabelDisplay="auto"/>
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
                                    value={ratingVal} 
                                    onChange={onRatingChange} 
                                    step={1} 
                                    marks 
                                    min={0} 
                                    max={5} 
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    className="ratingSlider"/>
                        </FormGroup>
                    </CardActions>
                </Card>
            </Grid>
            
        </Grid>
    )
}