import './GameProfile.css';

import { Card, CardContent, CardHeader, CardMedia, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../providers';
import ShowMoreText from 'react-show-more-text';
import { Carousel } from '../../ui';
import { useFetch } from '../../ui/hooks/useFetch';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';

export const GameProfile: React.FC = () => {
    const { id } = useParams();
    const { value: fullGame, isLoading: loadingFullGame } = useFetch(() => getGameById(+id!), null);
    const [expand, setExpand] = useState(false);
    const onClick = () => {
        setExpand(!expand);
    };

    return (
        <div style={{ overflow: 'scroll' }}>
            <div className="main-game-screen">
                <div className="game-screenshots">
                    {fullGame ? (
                        <Carousel
                            title=""
                            items={fullGame?.screenShots}
                            autoSlide
                            isLoading={loadingFullGame}
                        />
                    ) : (
                        ''
                    )}
                </div>
                <div className="game-info">
                    <h2>{fullGame?.name}</h2>
                    <img src={fullGame?.imageUrl} height={300} />
                    <div>
                        <ShowMoreText
                            lines={3}
                            more={<ExpandMore />}
                            less={<ExpandLess />}
                            onClick={onClick}
                            expanded={expand}
                            width={280}
                            className="game-description"
                        >
                            <span
                                className="game-description-content"
                                dangerouslySetInnerHTML={{ __html: fullGame?.description }}
                            />
                        </ShowMoreText>
                    </div>
                    <br />
                    <div className="genral-game-info">
                        <div className="cardWriting">
                            Rating:{' '}
                            <Rating
                                readOnly
                                value={fullGame?.rating ? fullGame?.rating : 0}
                                precision={0.1}
                            />
                        </div>
                        <div className="cardWriting">Release Date: {fullGame?.released}</div>
                        <div className="cardWriting">Playtime: {fullGame?.playtime} Hours</div>
                    </div>
                    <div className="game-generes">
                        {fullGame?.genres.map((genre: any, i: any) => (
                            <span key={i} className="genere-of-game">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div className="buy-game">
                    <div className="buy-game-title-div">
                        <h1 className="buy-game-title">{`Buy ${fullGame?.name}:`}</h1>
                    </div>
                    <div className="buy-game-btn">
                        <span>{fullGame?.price}$</span>
                        <Button className="add-to-card-btn" variant="outlined">
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
            <br />
            <div className="main-achievements">
                <h2 className="achievements-title">Achievements: </h2>
                <div className="achievements">
                    {fullGame?.achievements.map((ach, i) => (
                        <div key={i}>
                            <img src={ach.image} height={30} />
                            <span> {ach.name}</span>
                            <div>{ach.description}</div>
                            <span>{ach.percent}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
