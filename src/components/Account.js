// src/components/Account.js
import React from 'react';
import { useAuth } from '../AuthContext';
import { Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    if (!currentUser) {
        navigate('/register');
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Account
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Name: {currentUser?.displayName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Email: {currentUser?.email}
                </Typography>
            </Box>
        </Container>
    );
};

export default Account;
