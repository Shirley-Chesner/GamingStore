import React from "react";
import './SearchPage.css'

import { TextInput } from "./../../ui/inputs/TextInput"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Slider } from "@mui/material";

export const SearchPage: React.FC = () => {
    const [priceVal, setPriceVal] = React.useState<number>(30);
    
    const onSearch = (value: string) => {
            console.log(value);
            
    }

    const onPriceChange = (event: Event, value: number | number[] , activeThumb: Number) => {
        setPriceVal(value as number);
    }

    return (
        <div>
            <div className="searchBar">
                <TextInput className="searchBar" title="Search" outline onChange={onSearch}/>
            </div>
            <div className="searchByTags">
                <Card>
                    <CardContent>
                        <Typography> By Price: </Typography>
                    </CardContent>
                <CardActions>
                    <Slider aria-label="Temperature" value={priceVal} onChange={onPriceChange} step={5} marks min={0} max={100} defaultValue={50}/>
                </CardActions>
                </Card>
                <Card>
                    <CardContent>
                        <Typography> By Price: </Typography>
                    </CardContent>
                <CardActions>
                    <Slider aria-label="Temperature" value={priceVal} onChange={onPriceChange} step={5} marks min={0} max={100} defaultValue={50}/>
                </CardActions>
                </Card>
            </div>
                
        </div>

    );

}