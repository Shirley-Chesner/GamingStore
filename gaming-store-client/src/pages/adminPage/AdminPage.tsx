import './AdminPage.css'

import { FC, useEffect, useState } from 'react';
import { useAuthContext } from '../../providers/auth/AuthProvider';
import { Button, Card, CardContent, CardHeader, Menu, MenuItem, Typography } from '@mui/material';

import io from 'socket.io-client';

export const AdminPage: FC = () => {    
    const socket = io('localhost:1234');
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [currentUsers, setCurrentUsers] = useState(0);
    const [earning, setEarning] = useState(0);
    const [currentActiveUsers, setCurrentActiveUsers] = useState(0);
    const [highestBoughtGames, setHighestBoughtGames] = useState([]);

    const { signOut } = useAuthContext();

    useEffect(() => {
        handleConnection()
          return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('current users');
            socket.off('highest games');
            socket.off('earning');
            socket.off('all users');
          };
    }, [])

    const handleConnection = () => {
        socket.on('connect', () => {
            setIsConnected(true);
            console.log('connected');
            socket.emit('admin');
          });
      
          socket.on('disconnect', () => {
            setIsConnected(false);
          });
      
          socket.on('current users', (msg) => {
              setCurrentActiveUsers(msg);
          });
          socket.on('highest games', (msg) => {
              setHighestBoughtGames(msg);
          })
          socket.on('earning', (msg) => {
              setEarning(msg);
          })
          socket.on('all users', (msg) => {
              setCurrentUsers(msg);
          })
    }
        
    const getHighestBoughtGamesCell = () => {
       const rows: JSX.Element[] = [];
       highestBoughtGames.forEach((game: any) => {
            rows.push(<tr key={game.game_id}><td>{game.game_id}</td><td>{game.price}</td><td>{game.how_many_bought}</td></tr>)
        })
        return rows;
    }

    return (
        <div>
            <div className='pageHeader'>
                <h1>Hello Admin,</h1>
                <Button onClick={signOut}>Sign Out</Button>
            </div>
            <div className='pageInfo'>
                <Card className='playersInfo'>
                    <CardHeader title='Players Info:'/>
                    <CardContent>
                        <Typography>
                            Amount of users: {currentUsers}
                        </Typography>
                        <Typography>
                            Current Active Users: {currentActiveUsers}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className='highestBoughtGames'>
                    <CardHeader title='Top Selling Games:'/>
                    <CardContent>
                        <table className='highestBoughtGamesTable'>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Sold</th>
                            </tr>
                            </thead>
                            <tbody>
                                {getHighestBoughtGamesCell()}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
                <Card className='earning'>
                    <CardHeader title='Earning:'/>
                    <CardContent>
                    <Typography>
                             {earning}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    )

}