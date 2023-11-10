import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import './forgotPasswordComponent.scss';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordComponent: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    const backToLogin = () => {
        navigate('/login');
    }


    return (
        <div className='forgot-password-container'>
            <Card sx={{ minWidth: 350, width: '50vw', padding: '10px' }}>
                <form onSubmit={handleFormSubmit}>
                    <CardHeader  title="Forgot Password"></CardHeader>
                    <CardContent>
                        {isSubmitted ? (
                            <div>
                                <Typography variant="body1">
                                    We have sent instructions to reset your password to your email address.
                                </Typography>
                            </div>
                        ) : (
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                            />

                        )}
                    </CardContent>
                    <CardActions sx={{padding: '8px 16px', justifyContent: 'end'}}>
                        {isSubmitted ? (
                            <Button variant="outlined" color="primary" onClick={backToLogin}>
                                Back to Login
                            </Button>
                        ) : (
                            <Button type="submit" variant="contained" color="primary">
                                Send Reset Instructions
                            </Button>
                        )}
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

export default ForgotPasswordComponent;
