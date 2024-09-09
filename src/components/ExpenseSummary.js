import React from 'react';
import { Typography, Box } from '@mui/material';

const ExpenseSummary = ({ totalAmount, splitAmount }) => {
    return (
        <Box my={2}>
            <Typography variant="h6">Total Expenses: ${totalAmount.toFixed(2)}</Typography>
            <Typography variant="h6">Amount per User: ${splitAmount}</Typography>
        </Box>
    );
};

export default ExpenseSummary;
