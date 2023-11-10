import React from 'react';
import { TextField } from '@mui/material';
import { NewUser, User } from '../../interfaces/users';
import './userFormComponent.scss';

interface UserFormProps<T> {
    userData: T;
    updateUserData: (userData: T) => void;
    isEdit: boolean;
}

const UserFormComponent: React.FC<UserFormProps<User | NewUser>> = ({ userData, updateUserData, isEdit }) => {
    return (
        <form className='user-form'>  
            <TextField
                className='dialog-form__input'
                label='Login'
                variant='outlined'
                fullWidth
                value={(userData as NewUser).login}
                name='login'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, login: e.target.value });
                }}
            />
            {!isEdit && <TextField
                className='dialog-form__input'
                label='Password'
                type="password"
                variant='outlined'
                fullWidth
                value={(userData as NewUser).password}
                name='password'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, password: e.target.value });
                }}
            />}
            <TextField
                className='dialog-form__input'
                label='Name'
                variant='outlined'
                fullWidth
                value={userData?.name}
                name='name'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, name: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Surname'
                variant='outlined'
                fullWidth
                value={userData?.surname}
                name='surname'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, surname: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Age'
                type='number'
                variant='outlined'
                fullWidth
                value={userData?.age}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                name='age'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, age: parseInt(e.target.value) });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Phone Number'
                variant='outlined'
                fullWidth
                value={userData?.phoneNumber}
                name='phoneNumber'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, phoneNumber: e.target.value });
                }}
            />
            <TextField
                className='dialog-form__input'
                label='Email'
                type='email'
                variant='outlined'
                fullWidth
                value={userData?.email}
                name='email'
                required
                onChange={(e) => {
                    updateUserData({ ...userData, email: e.target.value });
                }}
            />
        </form>
    );
};

export default UserFormComponent;
