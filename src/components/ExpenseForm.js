import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ExpenseForm = ({ onAddExpense }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && description && users.length) {
            onAddExpense({ amount: parseFloat(amount), description, users });
            setAmount('');
            setDescription('');
            setUsers([]);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} mb={2}>
            <TextField
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Users (comma separated)"
                value={users.join(', ')}
                onChange={(e) => setUsers(e.target.value.split(',').map(user => user.trim()))}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Add Expense
            </Button>
        </Box>
    );
};

export default ExpenseForm;
