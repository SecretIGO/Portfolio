import React from 'react';
import { LinearProgress } from '@mui/material';

const ProgressBar = ({ theme, value }) => {
    return (
        <LinearProgress
            variant="determinate"
            value={value}
            sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: theme.progressBarBackground,
                '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.progressBar,
                    borderRadius: 5
                }
            }}
        />
    );
};

export default ProgressBar; 