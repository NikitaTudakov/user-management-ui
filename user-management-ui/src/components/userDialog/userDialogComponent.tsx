
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { NewUser, User } from '../../interfaces/users';

import './userDialogComponent.scss';
import UserFormComponent from '../userForm/userFormComponent';
import { createUser, updateUser } from '../../services/users';

interface UserDialogProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const [userData, setUserData] = useState<User | NewUser>(user ?? {
        login: '',
        password: '',
        name: '',
        surname: '',
        age: 0,
        phoneNumber: '',
        email: '',
    
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const isEdit = !!user;

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
        for(let prop in userData) {
            if(!userData[prop as keyof (User | NewUser)]) {
                setIsFormValid(false);
                return;
            }
        }
        setIsFormValid(true);
    };

    const handleUpdatingUserData = (userData: User | NewUser) => {
        setUserData(userData);
        validateForm();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent className='dialog-form' style={{ paddingTop: '10px'}}>
                <UserFormComponent userData={userData} updateUserData={handleUpdatingUserData} isEdit={isEdit} />
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