import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Container, Typography, Button, Paper } from '@mui/material';

const AccountPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/register');
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Account
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Welcome, {auth.currentUser?.displayName}!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {auth.currentUser?.email}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{ marginTop: 2 }}
                >
                    Logout
                </Button>
            </Paper>
        </Container>
    );
};

export default AccountPage;
