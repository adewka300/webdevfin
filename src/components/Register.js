// src/components/Register.js
import React, { useRef } from 'react';
import { useAuth } from '../AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
            alert('Registration successful');
            navigate('/account');
        } catch (error) {
            alert('Error during registration: ' + error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        inputRef={nameRef}
                    />
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
                        Register
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account? <Link to="/login">Login</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
