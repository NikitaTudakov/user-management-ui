
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { User } from '../../interfaces/users';
import './deleteDialogComponent.scss';
import { deleteUser } from '../../api';

interface UserDialogProps {
    isOpen: boolean;
    user: User;
    onClose: () => void;
}

const DeleteDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {

    // save user to db
    const handleDeleteUser = async () => {
        await deleteUser(user.id)
        onClose();
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{'Delete User'}</DialogTitle>
        <DialogContent style={{ paddingTop: '10px'}}>
            <DialogContentText>
                Are you sure you want to delete user {user.name + ' ' + user.surname}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button
                onClick={handleDeleteUser}
                variant='outlined'
                color="error"
            >
                Delete
            </Button>
        </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;