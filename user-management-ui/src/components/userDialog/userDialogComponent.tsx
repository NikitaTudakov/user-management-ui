
import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { NewUser, User } from '../../interfaces/users';

import './userDialogComponent.scss';
import UserFormComponent from '../userForm/userFormComponent';
import { createUser, updateUser } from '../../services/users';
import { useSnackbar } from '../snackbar/snackbarContext';
import { NotificationTypes } from '../../enums/notificationTypes.enum';

interface UserDialogProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const { showSnackbar } = useSnackbar();

    const [userData, setUserData] = useState<User | NewUser>(user ?? {
        login: '',
        password: '',
        name: '',
        surname: '',
        age: null,
        phoneNumber: '',
        email: '',
    
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const isEdit = !!user;

    // save user to db
    const handleSave = async () => {
        try {
            if(userData?.id) {
                await updateUser(userData.id,userData as User);
                showSnackbar('User successfully updated', NotificationTypes.SUCCESS);
            } else {
                await createUser(userData as User);
                showSnackbar('User successfully created', NotificationTypes.SUCCESS);
            }
            onClose();
        } catch {
            showSnackbar('Something went wrong, please try again', NotificationTypes.ERROR);
        }
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