
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { User } from '../../interfaces/users';
import './deleteDialogComponent.scss';
import { deleteUser } from '../../services/users';
import { useSnackbar } from '../snackbar/snackbarContext';
import { NotificationTypes } from '../../enums/notificationTypes.enum';

interface UserDialogProps {
    isOpen: boolean;
    user: User;
    onClose: () => void;
}

const DeleteDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const { showSnackbar } = useSnackbar();

    // save user to db
    const handleDeleteUser = async () => {
        try {
            await deleteUser(user.id!);
            showSnackbar('User successfully deleted', NotificationTypes.SUCCESS);
            onClose();
        } catch {
            showSnackbar('Something went wrong, please try again', NotificationTypes.ERROR);
        }
    };


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{'Delete User'}</DialogTitle>
            <DialogContent style={{ paddingTop: '10px'}}>
                <DialogContentText>
                    Are you sure you want to delete user {user.name + ' ' + user.surname}?
                </DialogContentText>
            </DialogContent>
            <DialogActions id="delete-dialog__actions">
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