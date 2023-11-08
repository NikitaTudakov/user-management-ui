import React from 'react';
import { TextField } from '@mui/material';

interface UserFormProps {
    userData: {
        login?: string;
        password?: string;
        name?: string;
        surname?: string;
        age?: number;
        phoneNumber?: string;
        email?: string;
    } | null;
    updateUserData: (userData: {
        login?: string;
        password?: string;
        name?: string;
        surname?: string;
        age?: number;
        phoneNumber?: string;
        email?: string;
    }) => void;
}

const UserFormComponent: React.FC<UserFormProps> = ({ userData, updateUserData }) => {

    return (
        <>
            <TextField
                className='dialog-form__input'
                label='Login'
                variant='outlined'
                fullWidth
                value={userData?.login || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, login: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Password'
                variant='outlined'
                fullWidth
                value={userData?.password || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, password: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Name'
                variant='outlined'
                fullWidth
                value={userData?.name || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, name: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Surname'
                variant='outlined'
                fullWidth
                value={userData?.surname || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, surname: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Age'
                variant='outlined'
                fullWidth
                value={userData?.age || 0}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={(e) => {
                    updateUserData({ ...userData, age: parseInt(e.target.value) });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Phone Number'
                variant='outlined'
                fullWidth
                value={userData?.phoneNumber || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, phoneNumber: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Email'
                variant='outlined'
                fullWidth
                value={userData?.email || ''}
                onChange={(e) => {
                    updateUserData({ ...userData, email: e.target.value });
                }}
            />
        </>
    );
};

export default UserFormComponent;
