import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './loadingScreenComponent.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size="10rem" />
        </Box>
    </div>
  );
};

export default LoadingScreen;