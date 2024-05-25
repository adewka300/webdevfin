import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import { AppBar, Toolbar, Typography, Container, Button, CssBaseline } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: 'rgba(0, 0, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Mospolytech Store
                        </Typography>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/cart">
                            Bag
                        </Button>
                        <Button color="inherit" component={Link} to="/account">
                            Account
                        </Button>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Container sx={{ marginTop: 4 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/account" element={<AccountPage />} />
                    </Routes>
                </Container>
            </Router>
        </Provider>
    );
}

export default App;
