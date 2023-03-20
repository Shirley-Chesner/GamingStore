import './GameProfile.css';

import {
    Badge,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Rating,
    TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getGameById,
    GetGameFromDB,
    getUserFromDB,
    parseToUser,
    useAuthContext,
} from '../../providers';
import ShowMoreText from 'react-show-more-text';
import { Carousel } from '../../ui';
import { useFetch } from '../../ui/hooks/useFetch';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Button from '@mui/material/Button';
import { AddNewCommentToDB, connectCommentToGameAndUser } from './HelpfulFunctions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const GameProfile: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const {
        value: fullGame,
        isLoading: loadingFullGame,
        refetch,
    } = useFetch(() => getGameById(+id!), undefined);

    const [expand, setExpand] = useState(false);
    const [isGameInLibrary, setIsGameInLibrary] = useState(true);
    const [newComment, setNewComment] = useState('');

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const onClick = () => {
        setExpand(!expand);
    };

    useEffect(() => {
        checkIfGameInLibrary();
    }, []);

    const checkIfGameInLibrary = async () => {
        const userFromDB: any = await parseToUser(await getUserFromDB(user?.id ? user.id : ''));
        const isGameIn = userFromDB?.gameLibrary.some((game: any) => game.game_id == id);
        setIsGameInLibrary(isGameIn);
    };

    const addNewComment = async () => {
        if (newComment !== '') {
            await AddNewCommentToDB(newComment, fullGame?.id, user?.id ? user.id : '');
            await connectCommentToGameAndUser(fullGame?.id, user?.id ? user.id : '');
        }
        setNewComment('');
        await refetch();
    };

    const LikingAComment = async (commentID: string) => {
        await fetch(`http://localhost:1234/comment/${commentID}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { likes: user?.id },
                isArray: true,
            }),
        });
        await refetch();
    };

    const addingAReplay = async (replay: string, commentID: string) => {
        await fetch(`http://localhost:1234/comment/${commentID}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { replay: replay },
                isArray: true,
            }),
        });
        await refetch();
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
                        {isGameInLibrary ? (
                            <Button className="add-to-card-btn" variant="outlined" disabled={true}>
                                Game is Already In Library
                            </Button>
                        ) : (
                            <Button
                                className="add-to-card-btn"
                                variant="outlined"
                                onClick={() =>
                                    navigate(`/cart/${fullGame?.id}/${fullGame?.idFromDB}`)
                                }
                            >
                                Add To Cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <br />
            <div className="bottom-profile">
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
                <div className="game-comments">
                    <h2>Comments: </h2>
                    <div className="write-your-comment">
                        <TextField
                            value={newComment}
                            id="outlined-basic"
                            onChange={(event) => {
                                setNewComment(event.target.value);
                            }}
                            className="new-comment-content"
                            label="New Comment"
                            variant="outlined"
                            multiline
                        />
                        <br />
                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            className="submit-new-comment-btn"
                            onClick={addNewComment}
                        >
                            Submit
                        </Button>
                    </div>
                    <div className="comments">
                        {/* <Button className="toggle-replays" onClick={handleClick}>
                            Toggle Replays
                        </Button> */}
                        {fullGame?.comments && fullGame?.comments.length !== 0 ? (
                            fullGame?.comments.map((comment: any, i: any) => (
                                <div key={i} className="written-comments">
                                    <Badge
                                        badgeContent={comment?.likes.length}
                                        color="primary"
                                        key={i}
                                    >
                                        <div className="written-comment-info">
                                            <div className="written-comments-name">
                                                By User: {comment?.userName}
                                            </div>
                                            {comment.userID !== user?.id ? (
                                                <Button
                                                    onClick={() => {
                                                        if (!comment.likes.includes(user?.id)) {
                                                            LikingAComment(comment.commentID);
                                                        }
                                                    }}
                                                >
                                                    {comment.likes.includes(user?.id) ? (
                                                        <FavoriteIcon />
                                                    ) : (
                                                        <FavoriteBorderIcon />
                                                    )}
                                                </Button>
                                            ) : (
                                                ''
                                            )}

                                            <div className="written-comments-content">
                                                {comment?.content}
                                            </div>
                                        </div>
                                    </Badge>

                                    <div>
                                        {/* <List>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <TextField
                                                        onChange={(event) => {
                                                            addingAReplay(
                                                                event.target.value,
                                                                comment.commentID,
                                                            );
                                                        }}
                                                        label="Add Replay"
                                                        variant="outlined"
                                                        multiline
                                                    />
                                                    {comment?.replays.map((replay: any, i: any) => (
                                                        <ListItemText primary={replay} key={i} />
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </List> */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                Pretty empty here! <br /> Be the first to write a comment!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
