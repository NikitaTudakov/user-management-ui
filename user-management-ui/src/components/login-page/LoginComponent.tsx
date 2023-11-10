import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './LoginComponent.scss';
import { NewUser, User } from '../../interfaces/users';
import { LoginForm } from '../../interfaces/loginForm';
import { login, register } from '../../services/login';
import UserFormComponent from '../userForm/userFormComponent';
import { useSnackbar } from '../snackbar/snackbarContext';
import { NotificationTypes } from '../../enums/notificationTypes.enum';

interface LoginComponentProps {
    onAuthenticationSuccess: (result: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({onAuthenticationSuccess}) => {
    const { showSnackbar } = useSnackbar();
    const [isRegisterFormValid, setIsRegisterFormValid] = useState<boolean>(false);
    const [isLoginFormValid, setIsLoginFormValid] = useState<boolean>(false);
    const [isLoginState, setLoginState] = useState<boolean>(true);
    const [loginData, setLoginData] = useState<LoginForm>({
        login: '',
        password: ''
    });
    const [userData, setUserData] = useState<NewUser>({
        login: '',
        password: '',
        name: '',
        surname: '',
        age: null,
        phoneNumber: '',
        email: ''
    });
    const navigate = useNavigate();

    //handle login function
    const handleLogin = () => {
        login(loginData).then((isLogin: boolean) => {
            onAuthenticationSuccess(isLogin);
            if(isLogin) {
                navigate('/overview');
                showSnackbar('User successfully logged in', NotificationTypes.SUCCESS)
                clearLoginForm();
            } else {
                showSnackbar('Wrong login or password', NotificationTypes.ERROR)
            }
        })
    };

    const handleRegister = () => {
        register(userData).then((isLogin: boolean) => {
            onAuthenticationSuccess(isLogin);
            if(isLogin) {
                navigate('/overview');
                showSnackbar('User successfully registered', NotificationTypes.SUCCESS)
                clearRegisterForm();
            } else {
                showSnackbar('User already exists', NotificationTypes.ERROR)
            }
        })
    };

    const validateRegisterForm = () => {
        for(let key in userData) {
            if(!userData[key as keyof NewUser]) {
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
            age: null,
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

    const handleRegisterInputChanges = (userData: NewUser | User) => {
        setUserData({...userData as NewUser});
        validateRegisterForm();
    }

    const handleLoginInputChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                        <div className='forgot-password'>
                            <Link to="forgot-password">Forgot Password?</Link>
                        </div>
                    </> 
                    :
                        <>
                            <UserFormComponent
                                userData={userData}
                                updateUserData={handleRegisterInputChanges}
                                isEdit={false}
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