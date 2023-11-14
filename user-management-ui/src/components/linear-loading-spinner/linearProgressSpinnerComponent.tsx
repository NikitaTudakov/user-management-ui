import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearProgressSpinner() {
  return (
    <Box sx={{ position:'absolute', top: '0', left:'0',right:'0' }}>
      <LinearProgress />
    </Box>
  );
}