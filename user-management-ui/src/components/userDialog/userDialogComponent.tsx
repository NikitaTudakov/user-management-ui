
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { User } from '../../interfaces/users';

import './userDialogComponent.scss';
import UserFormComponent from '../userForm/userFormComponent';
import { createUser, updateUser } from '../../services/users';

interface UserDialogProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const [userData, setUserData] = useState<Partial<User> | null>(user);
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
        validateForm();
    }, [userData]);

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
        if (
            userData?.login && userData?.password && userData?.name &&
            userData?.surname && userData?.age && userData?.phoneNumber && userData?.email
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent className='dialog-form' style={{ paddingTop: '10px'}}>
                <UserFormComponent userData={userData} updateUserData={setUserData} />
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