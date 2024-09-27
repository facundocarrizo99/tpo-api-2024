import React, { useState } from 'react';
import {TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {addExpense} from "../GroupBackend";

function AddExpenseForm({users}, {selectedGroup}) {
    const [formExpenseValues, setFormExpenseValues] = useState({
        groupName: '',
        payer: [],
        description: '',
        amount: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormExpenseValues({
            ...formExpenseValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense(selectedGroup, formExpenseValues);
        console.log('Arreglo created:', formExpenseValues);
    };

    return (
        <form
            style={{
                '& .MuiTextField-root': {m: 1, width: '100%'},
                maxWidth: 500,
                margin: '0 auto',
                padding: 2,
                backgroundColor: '#f4f4f4',
                borderRadius: 2,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Create New Gasto
            </Typography>
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formExpenseValues.description}
                onChange={handleChange}
                multiline
                rows={2}
                required
            />
            <TextField
                label="amount"
                variant="outlined"
                name="amount"
                value={formExpenseValues.amount}
                onChange={handleChange}
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="payer-select-label">Payer</InputLabel>
                <Select
                    labelId="payer-select-label"
                    id="payer"
                    name="payer"
                    value={formExpenseValues.payer}
                    onChange={handleChange}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{mt: 2}}
                onClick={handleSubmit}
            >
                Create Gasto
            </Button>
        </form>
    );
}

export default AddExpenseForm;
