// src/components/Login.js
import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            alert('Login successful');
            navigate('/account');
        } catch (error) {
            alert('Login error');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        inputRef={emailRef}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        inputRef={passwordRef}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
