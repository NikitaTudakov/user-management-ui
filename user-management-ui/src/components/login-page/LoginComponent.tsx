import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.scss';
import { User } from '../../interfaces/users';
import { LoginForm } from '../../interfaces/loginForm';
import { login, register } from '../../services/login';

interface LoginComponentProps {
    onAuthenticationSuccess: (result: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({onAuthenticationSuccess}) => {
    const [isRegisterFormValid, setIsRegisterFormValid] = useState<boolean>(false);
    const [isLoginFormValid, setIsLoginFormValid] = useState<boolean>(false);
    const [isLoginState, setLoginState] = useState<boolean>(true);
    const [loginData, setLoginData] = useState<LoginForm>({
        login: '',
        password: ''
    });
    const [userData, setUserData] = useState<User>({
        login: '',
        password: '',
        name: '',
        surname: '',
        age: 0,
        phoneNumber: '',
        email: ''
    });
    const navigate = useNavigate();

    //handle login function
    const handleLogin = () => {
        login(loginData).then((accessToken: string) => {
            if(!!accessToken) {
                onAuthenticationSuccess(true);
                navigate('/overview')
            } else {
                onAuthenticationSuccess(false);
            }
        })
    };

    const handleRegister = () => {
        register(userData).then((accessToken: string) => {
            if(!!accessToken) {
                localStorage.setItem('accessToken', accessToken);
                onAuthenticationSuccess(true);
                navigate('/overview')
            } else {
                onAuthenticationSuccess(false);
            }
        })
    };

    const validateRegisterForm = () => {
        for(let key in userData) {
            if(!userData[key as keyof User]) {
                setIsRegisterFormValid(false);
                return;
            }
        }
        return setIsRegisterFormValid(true);
    };

    const validateLoginForm = () => {
        if(loginData.login && loginData.password) {
            setIsLoginFormValid(true);
        } else {
            setIsLoginFormValid(false);
        }
    }

    const clearRegisterForm = () => {
        setUserData({
            login: '',
            password: '',
            name: '',
            surname: '',
            age: 0,
            phoneNumber: '',
            email: ''
        });
        setIsRegisterFormValid(false);
    }

    const clearLoginForm = () => {
        setLoginData({
            login: '',
            password: ''
        });
        setIsLoginFormValid(false);
    }

    const handleRegisterInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        validateRegisterForm();
    }

    const handleLoginInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e.target.name)
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        validateLoginForm();
    }

    return (
        <div className='container'>
            <div className='login-form'>   
                <h2>{(isLoginState ? 'Login' : 'Register') + ' to test application'}</h2>


                {isLoginState ?
                    <>
                        <TextField
                            label="Login"
                            variant="outlined"
                            value={loginData.login}
                            name='login'
                            onChange={(e) => handleLoginInputChanges(e)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={loginData.password}
                            name='password'
                            onChange={(e) => handleLoginInputChanges(e)}
                        />
                    </> :
                    <>
                        <TextField
                            label="Login"
                            variant="outlined"
                            value={userData.login}
                            name='login'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={userData.password}
                            name='password'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label='Name'
                            variant='outlined'
                            fullWidth
                            value={userData.name}
                            name='name'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label='Surname'
                            variant='outlined'
                            fullWidth
                            value={userData.surname}
                            name='surname'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label='Age'
                            variant='outlined'
                            fullWidth
                            value={userData.age}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            name='age'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label='Phone Number'
                            variant='outlined'
                            fullWidth
                            value={userData.phoneNumber}
                            name='phoneNumber'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                        <TextField
                            label='Email'
                            variant='outlined'
                            fullWidth
                            value={userData.email}
                            name='email'
                            onChange={(e) => handleRegisterInputChanges(e)}
                        />
                    </>  
                }
                <div className='login-form__actions'>
                    {isLoginState ? 
                        <Button variant="outlined" color="primary" 
                            onClick={() => {
                                setLoginState(false)
                                clearLoginForm();
                            }}
                        >
                            Register
                        </Button>
                        :
                        <Button variant="outlined" color="primary"
                            onClick={() => {
                                setLoginState(true);
                                clearRegisterForm();
                            }}
                        >
                            Back to Login
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isLoginState ? handleLogin : handleRegister}
                        disabled={isLoginState ? !isLoginFormValid : !isRegisterFormValid}
                    >
                        {isLoginState ? 'Log in' : 'Register'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;