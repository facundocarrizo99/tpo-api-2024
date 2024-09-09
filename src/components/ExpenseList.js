import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ExpenseList = ({ expenses }) => {
    return (
        <List>
            {expenses.map((expense, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={`${expense.description}: $${expense.amount.toFixed(2)}`}
                        secondary={`Users: ${expense.users.join(', ')}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ExpenseList;
