import './AdminPage.css';

import { FC, useEffect, useState } from 'react';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { Button, Card, CardContent, CardHeader, Menu, MenuItem, Typography } from '@mui/material';

import io from 'socket.io-client';
import { BaseGame, getGameById, getGames } from '../../providers';

export const AdminPage: FC = () => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [currentUsers, setCurrentUsers] = useState(0);
    const [highestBoughtGamesRows, setHighestBoughtGamesRows] = useState<JSX.Element[]>([]);
    const [topCommentsRows, setTopCommentsRows] = useState<JSX.Element[]>([]);
    const [earning, setEarning] = useState(0);
    const [currentActiveUsers, setCurrentActiveUsers] = useState(0);

    const { signOut } = useAuthContext();

    useEffect(() => {
        if (socket === null) {
            setSocket(io('localhost:1234'));
        }
        if (socket) {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log('connected');
                socket.emit('admin');
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
            });

            socket.on('current users', (msg: any) => {
                setCurrentActiveUsers(msg);
            });
            socket.on('highest games', (msg: any[]) => {
                getHighestBoughtGamesCell(msg);
            });
            socket.on('earning', (msg: any) => {
                setEarning(msg);
            });
            socket.on('all users', (msg: any) => {
                setCurrentUsers(msg);
            });
            socket.on('top comments', (msg: any) => {
                getTopCommentsCell(msg);
            });
        }

        //     socket.emit('admin');
        // }
        //   return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        //     socket.off('current users');
        //     socket.off('highest games');
        //     socket.off('earning');
        //     socket.off('all users');
        //   };
    }, [socket]);

    const getHighestBoughtGamesCell = async (msg: any) => {
        const res = msg.map(async (game: any, i: any) => {
            const val = await getGameById(game.game_id);
            const gameName = val ? val.name : 'The game was not found';
            return (
                <tr key={`${game.game_id}${i}-game`}>
                    <td>{gameName}</td>
                    <td className="umum">{game.price}$</td>
                    <td className="umum">{game.how_many_bought}</td>
                </tr>
            );
        });
        setHighestBoughtGamesRows(await Promise.all(res));
    };

    const getTopCommentsCell = async (msg: any) => {
        const res = msg.map(async (comment: any, i: any) => {
            const val = await getGameById(comment.game_id);
            const gameName = val ? val.name : 'The game was not found';
            // TODO: show the user name instead of id
            return (
                <tr key={`${comment.comment_id}${i}-comment`}>
                    <td className="umum">{comment.user_id}</td>
                    <td className="umum">{comment.comment}</td>
                    <td className="umum">{comment.likes}</td>
                    <td>{gameName}</td>
                </tr>
            );
        });
        setTopCommentsRows(await Promise.all(res));
    };

    return (
        <div>
            <div className="pageHeader">
                <h1>Hello Admin,</h1>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
            <div className="pageInfo">
                <div className="partOfPageInfo">
                    <Card className="playersInfo">
                        <CardHeader title="Players Info:" className="cardHeader" />
                        <CardContent>
                            <Typography className="cardWriting">
                                Amount of Users: {currentUsers}
                            </Typography>
                            <Typography className="cardWriting">
                                Current Active Users: {currentActiveUsers}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="earning">
                        <CardHeader title="Earning:" className="cardHeader" />
                        <CardContent>
                            <Typography className="cardWriting">{earning}$</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="topStuffTable">
                    <Card className="highestBoughtGames">
                        <CardHeader title="Top Selling Games:" className="cardHeader" />
                        <CardContent className="highestBoughtGamesContent">
                            <table className="highestBoughtGamesTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Sold</th>
                                    </tr>
                                </thead>
                                <tbody>{highestBoughtGamesRows}</tbody>
                            </table>
                        </CardContent>
                    </Card>
                    <Card className="highestBoughtGames">
                        <CardHeader title="Top Comments:" className="cardHeader" />
                        <CardContent>
                            <table className="topCommentsTable">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Comment</th>
                                        <th>Likes</th>
                                        <th>What Game</th>
                                    </tr>
                                </thead>
                                <tbody>{topCommentsRows}</tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
