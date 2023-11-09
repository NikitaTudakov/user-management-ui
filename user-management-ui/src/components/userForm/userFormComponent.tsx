import React from 'react';
import { TextField } from '@mui/material';
import { NewUser, User } from '../../interfaces/users';

interface UserFormProps<T> {
    userData: T;
    updateUserData: (userData: T) => void;
    isEdit: boolean;
}

const UserFormComponent: React.FC<UserFormProps<User | NewUser>> = ({ userData, updateUserData, isEdit }) => {
    return (
        <>  
            <TextField
                className='dialog-form__input'
                label='Login'
                variant='outlined'
                fullWidth
                value={(userData as NewUser).login}
                name='login'
                onChange={(e) => {
                    updateUserData({ ...userData, login: e.target.value });
                }}
            />
            {!isEdit && <TextField
                className='dialog-form__input'
                label='Password'
                variant='outlined'
                fullWidth
                value={(userData as NewUser).password}
                name='password'
                onChange={(e) => {
                    updateUserData({ ...userData, password: e.target.value });
                }}
            />}
            <TextField
                className='dialog-form__input'
                label='Name'
                variant='outlined'
                fullWidth
                value={userData?.name || ''}
                name='name'
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
                name='surname'
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
                name='age'
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
                name='phoneNumber'
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
                name='email'
                onChange={(e) => {
                    updateUserData({ ...userData, email: e.target.value });
                }}
            />
        </>
    );
};

export default UserFormComponent;
