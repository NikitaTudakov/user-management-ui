import { Box, Button, Card,CardActions,CardContent,CardHeader, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from '../snackbar/snackbarContext';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/login';

const ResetPasswordCompoennt: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isShowPasswordError, setIsShowPasswordError] = useState<boolean>(false);

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const {showSnackbar} = useSnackbar();

    const backToLogin = () => {
        navigate('/login');
    }
    const checkPasswordMatches = (): boolean => {
        return password === passwordConfirm;
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(checkPasswordMatches()) {
            resetPassword(passwordConfirm,searchParams.get('accessToken') || '').then(() => {
                setIsSubmitted(true);
                showSnackbar('Password was reset successfully', NotificationTypes.SUCCESS);
            }).catch(() => {
                showSnackbar('Something went wrong, please try again', NotificationTypes.ERROR)
            })
        } else {
            setIsShowPasswordError(true);
        }
    }

    return (
        <div className='password-container'>
            <Card sx={{ minWidth: 350, width: '50vw', padding: '10px' }}>
                <form onSubmit={handleFormSubmit}>
                    <CardHeader  title="Reset Password"></CardHeader>
                    <CardContent className='password-container__content'>
                        {isSubmitted ? (
                            <div>
                                <Typography variant="body1">
                                    Password was reset successfully.
                                </Typography>
                            </div>
                        ) : (
                            <>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    value={password}
                                    fullWidth
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsShowPasswordError(false);
                                    }}

                                />
                                <TextField
                                    label="Password confirmation"
                                    variant="outlined"
                                    type="password"
                                    value={passwordConfirm}
                                    fullWidth
                                    required
                                    onChange={(e) => {
                                        setPasswordConfirm(e.target.value);
                                        setIsShowPasswordError(false);
                                    }}

                                />
                                
                                <Typography component="div" >
                                    <Box sx={{minHeight:'1em', lineHeight:'1em', color:'#BE3144'}}>                                                   
                                    {isShowPasswordError ? 'Passwords do not match' : ''}
                                    </Box>
                                </Typography>
                            </>

                        )}
                    </CardContent>
                    <CardActions sx={{padding: '8px 16px', justifyContent: 'end'}}>
                        {isSubmitted ? (
                            <Button variant="outlined" color="primary" onClick={backToLogin}>
                                Back to Login
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!password || !passwordConfirm || isShowPasswordError}
                            >
                                Reset
                            </Button>
                        )}
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

export default ResetPasswordCompoennt;