import './CartPage.css';

import { Button, Card } from '@mui/material';
import { FC, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserFromDB, useAuthContext } from '../../providers';
import { useFetch } from '../../ui';
import DeleteIcon from '@mui/icons-material/Delete';

export const CartPage: FC = () => {
    const { id, idInDB } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const {
        value: userInfo,
        isLoading: loadingUserInfo,
        refetch,
    } = useFetch(() => getUserFromDB(user?.id ? user.id : ''), undefined);

    useEffect(() => {
        addGameToCart();
    }, []);

    const addGameToCart = async () => {
        if (idInDB) {
            await fetch(`http://localhost:1234/user/${user?.id}`, {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    update: { in_cart: idInDB },
                    isArray: true,
                }),
            });
            await refetch();
        }
    };

    const removeAllTheGames = async () => {
        await fetch(`http://localhost:1234/user/${user?.id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { in_cart: [] },
            }),
        });
        await refetch();
    };

    const getTotalPrice = () => {
        let price = 0;
        userInfo?.inCart.forEach((item) => {
            price += item.price;
        });
        return price;
    };

    const getTotalGameCount = () => {
        let count = 0;
        userInfo?.inCart.forEach((item) => {
            count++;
        });
        return count;
    };

    const removeGameFromCart = async (gameToRemove: any) => {
        await fetch(`http://localhost:1234/user/${user?.id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { in_cart: gameToRemove },
                shouldRemove: true,
            }),
        });
        await refetch();
    };

    const buyGames = async () => {
        const games: any = [];
        userInfo?.inCart.forEach((game) => {
            games.push(game.idFromDB);
        });
        await fetch(`http://localhost:1234/user/${user?.id}`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                update: { game_library: games },
                isArray: true,
            }),
        });
        await removeAllTheGames();
        navigate('/');
    };

    return (
        <div className="cart-page">
            <Card className="order-summary">
                <h2>Shopping Summary</h2>
                <div className="total-price-container">
                    <h3>Estimated total:</h3>
                    <h2>{getTotalPrice()}$</h2>
                </div>
                <div className="total-game-count-container">
                    <h3>Game Count:</h3>
                    <h2>{getTotalGameCount()}</h2>
                </div>
                <div className="purchase-btn">
                    <Button variant="contained" onClick={buyGames}>
                        Purchase
                    </Button>
                </div>

                <div className="order-summary-bottom">
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeAllTheGames()}
                    >
                        Remove All Items
                    </Button>
                </div>
            </Card>
            <div className="cart-information">
                <div className="cart-top">
                    <h2>Shopping List</h2>
                </div>
                <div className="cart-items">
                    {userInfo
                        ? userInfo.inCart.map((game: any) => (
                              <Card className="cart-item" key={`${game.idFromDB}-1`}>
                                  <img src={game.imageUrl} />
                                  <h1 className="game-name">{game.name}</h1>
                                  <h1 className="price-tag">{game.price}$</h1>
                                  <Button
                                      variant="outlined"
                                      startIcon={<DeleteIcon />}
                                      className="remove-from-cart-button"
                                      onClick={() => removeGameFromCart(game.idFromDB)}
                                  >
                                      Remove From Cart
                                  </Button>
                              </Card>
                          ))
                        : ''}
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
