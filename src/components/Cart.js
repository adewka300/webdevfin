import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { increaseQuantity, decreaseQuantity } from '../store/actions/cartActions';
import { Add, Remove } from '@mui/icons-material';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Shopping Bag
            </Typography>
            {cartItems.length === 0 ? (
                <Typography>Your bag is empty :(</Typography>
            ) : (
                <List>
                    {cartItems.map((item) => (
                        <ListItem key={item.id} divider>
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <ListItemText primary={item.title} secondary={`$${item.price}`} />
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDecreaseQuantity(item.id)}
                                >
                                    <Remove />
                                </IconButton>
                                <Typography variant="body1" component="p" style={{ margin: '0 10px' }}>
                                    {item.qty}
                                </Typography>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleIncreaseQuantity(item.id)}
                                >
                                    <Add />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                    <Typography variant="h6" component="p" style={{ marginTop: '20px' }}>
                        Total: ${calculateTotal()}
                    </Typography>
                </List>
            )}
        </Container>
    );
};

export default Cart;
