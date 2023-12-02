
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { User } from '../../interfaces/users';
import './deleteDialogComponent.scss';
import { deleteUser } from '../../services/users';
import { useSnackbar } from '../snackbar/snackbarContext';
import { NotificationTypes } from '../../enums/notificationTypes.enum';
import { useLinearProgress } from '../linear-loading-spinner/linearProgressSpinnerContext';

interface UserDialogProps {
    isOpen: boolean;
    user: User;
    onClose: () => void;
}

const DeleteDialog: React.FC<UserDialogProps> = ({ isOpen, onClose, user }) => {
    const { showSnackbar } = useSnackbar();
    const { loading, setLoading } = useLinearProgress();

    // save user to db
    const handleDeleteUser = async () => {
        try {
            setLoading(true);
            await deleteUser(user.id!);
            showSnackbar('User successfully deleted', NotificationTypes.SUCCESS);
            setLoading(false);
            onClose();
        } catch {
            setLoading(false);
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
                <Button
                    onClick={onClose}
                    color="primary"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleDeleteUser}
                    variant='outlined'
                    color="error"
                    disabled={loading}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;