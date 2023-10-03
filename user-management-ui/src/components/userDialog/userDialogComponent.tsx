
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { User } from '../../interfaces/users';
import { updateUser,createUser } from '../../api';

import './userDialogComponent.scss';

interface UserDialogProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const [userData, setUserData] = useState<Partial<User> | null>(user);
    const [isFormValid, setIsFormValid] = useState(false);

    // save user to db
    const handleSave = async () => {
        if(userData?.id) {
            await updateUser(userData.id,userData as User);
        } else {
            await createUser(userData as User);
        }
        onClose();
    };

    // validate form
    const validateForm = () => {
        if (userData?.name && userData?.surname && userData?.age && userData?.phoneNumber && userData?.email) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent className='dialog-form' style={{ paddingTop: '10px'}}>
                <TextField
                    className='dialog-form__input'
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={userData?.name || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                        validateForm();
                    }}
                />
                <TextField
                    className='dialog-form__input'
                    label="Surname"
                    variant="outlined"
                    fullWidth
                    value={userData?.surname || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, surname: e.target.value });
                        validateForm();
                    }}
                />
                <TextField
                    className='dialog-form__input'
                    label="Age"
                    variant="outlined"
                    fullWidth
                    value={userData?.age || 0}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={(e) => {
                        setUserData({ ...userData, age: parseInt(e.target.value) });
                        validateForm();
                    }}
                />
                <TextField
                    className='dialog-form__input'
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={userData?.phoneNumber || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, phoneNumber: e.target.value });
                        validateForm();
                    }}
                />
                <TextField
                    className='dialog-form__input'
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={userData?.email || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                        validateForm();
                    }}
                />
            </DialogContent>
            <DialogActions id="dialog__actions">
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    disabled={!isFormValid}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDialog;