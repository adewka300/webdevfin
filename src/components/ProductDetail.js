import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { Container, Typography, CircularProgress, Card, CardContent, CardMedia, Button } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(product.id));
    };

    const isInCart = () => {
        return cartState.cartItems.some(item => item.id === product.id);
    };

    return (
        <Container sx={{ marginTop: 8 }}>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Card>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        height="400"
                        image={product.image}
                        style={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography variant="h4" component="h1">
                            {product.title}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            ${product.price}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {product.description}
                        </Typography>
                        <Button
                            variant="contained"
                            color={isInCart() ? "error" : "primary"}
                            onClick={isInCart() ? handleRemoveFromCart : handleAddToCart}
                            sx={{ marginTop: '20px', backgroundColor: isInCart() ? 'red' : 'green', '&:hover': { backgroundColor: isInCart() ? 'darkred' : 'darkgreen' } }}
                        >
                            {isInCart() ? "Remove from Bag" : "Add to Bag"}
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ProductDetail;
