import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const cartState = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const isInCart = (productId) => {
        return cartState.cartItems.some(item => item.id === productId);
    };

    return (
        <Container sx={{ marginTop: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Product List
            </Typography>
            {productState.loading ? (
                <CircularProgress />
            ) : productState.error ? (
                <Typography color="error">{productState.error}</Typography>
            ) : (
                <Grid container spacing={4}>
                    {productState.products.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card>
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        alt={product.title}
                                        height="140"
                                        image={product.image}
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Link>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        ${product.price}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color={isInCart(product.id) ? "error" : "primary"}
                                        onClick={isInCart(product.id) ? () => handleRemoveFromCart(product.id) : () => handleAddToCart(product)}
                                        sx={{ marginTop: '10px', backgroundColor: isInCart(product.id) ? 'red' : 'green', '&:hover': { backgroundColor: isInCart(product.id) ? 'darkred' : 'darkgreen' } }}
                                    >
                                        {isInCart(product.id) ? "Remove from Bag" : "Add to Bag"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ProductList;
