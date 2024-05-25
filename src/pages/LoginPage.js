import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Login successful!');
            setSeverity('success');
            setTimeout(() => {
                navigate('/account');
            }, 2000);
        } catch (error) {
            setMessage(error.message);
            setSeverity('error');
        }
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                {message && <Alert severity={severity} sx={{ marginBottom: 2 }}>{message}</Alert>}
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    fullWidth
                >
                    Login
                </Button>
                <Typography sx={{ marginTop: 2 }}>
                    Don't have an account? <a href="/register">Register</a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginPage;
