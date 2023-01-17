import './CartPage.css';

import { Button, Card } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getGames } from '../../providers';
import { useFetch } from '../../ui';

export const CartPage: FC = () => {
    const { value: games, isLoading } = useFetch(() => getGames({ page_size: 10 }), []);

    return (
        <div className="cart-page">
            <Card className="order-summary">
                <h2>Shopping Summary</h2>
            </Card>
            <div className="cart-information">
                <div className="cart-top">
                    <h2>Shopping List</h2>
                    <h3>
                        {games.length} game{games.length > 1 ? 's' : ''}
                    </h3>
                </div>
                <div className="cart-items">
                    {games.map((game) => (
                        <Card className="cart-item" key={game.id}>
                            <img src={game.imageUrl} />
                            <h4>{game.name}</h4>
                            <h4>100$</h4>
                        </Card>
                    ))}
                </div>
                <div className="cart-bottom">
                    <Button className="back-btn" variant="contained">
                        <Link to="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
