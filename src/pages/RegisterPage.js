import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Container, TextField, Button, Typography, Paper, Alert } from '@mui/material';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: `${name} ${surname}` });
            setMessage('Registration successful!');
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
                    Register
                </Typography>
                {message && <Alert severity={severity} sx={{ marginBottom: 2 }}>{message}</Alert>}
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />
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
                    onClick={handleRegister}
                    fullWidth
                >
                    Register
                </Button>
                <Typography sx={{ marginTop: 2 }}>
                    Already have an account? <a href="/login">Login</a>
                </Typography>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
