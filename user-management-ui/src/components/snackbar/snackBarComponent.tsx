import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarInterface } from '../../interfaces/snackbar';
import { useEffect } from 'react';
import { Alert, Slide } from '@mui/material';

const SnackbarComponent: React.FC<{snackbarData:SnackbarInterface}> = ({snackbarData}) => {
    const [open, setOpen] = React.useState(false);
    const [snackbarDataState, setSnackbarDataState]= React.useState<SnackbarInterface | null>(null);

    useEffect(() => {
        setSnackbarDataState(snackbarData);
        setOpen(true);
    }, [snackbarData])
    
    const handleClose = () => {
        setOpen(false);
        setSnackbarDataState(null);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            {snackbarDataState &&  <Snackbar
                TransitionComponent={Slide}
                anchorOrigin={{vertical:'top',horizontal:'right'}}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                action={action}
            > 
                <Alert onClose={handleClose} severity={snackbarDataState.type} sx={{ width: '100%' }}>
                    {snackbarDataState.message}
                </Alert>
            </Snackbar>}
        </div>
    );
}

export default SnackbarComponent;