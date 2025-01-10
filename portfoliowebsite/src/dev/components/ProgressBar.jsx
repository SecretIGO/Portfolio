import { Box, styled } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import React from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: 'red'
    },
}));

const ProgressBar = ({ value }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <BorderLinearProgress variant="determinate" value={value} />
        </Box>
    );
};

export default ProgressBar;