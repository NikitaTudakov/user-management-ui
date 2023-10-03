import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.scss';

interface LoginComponentProps {
    onAuthenticationSuccess: (result: boolean) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({onAuthenticationSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  //handle login function
  const handleLogin = () => {
    onAuthenticationSuccess(true);
    navigate('/overview')
  };

  return (
    <div className='container'>
        <div className='login-form'>   
            <h2>Wellcome to test application</h2>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className='login-form__actions'>
                <Button variant="outlined" color="primary" onClick={handleLogin}>
                    Register
                </Button>
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </div>
        </div>
    </div>
  );
};

export default LoginComponent;