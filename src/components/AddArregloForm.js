import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {addArreglo} from "../GroupBackend";

function ArregloForm({users}, {selectedGroup}) {
    const [formArregloValues, setFormArregloValues] = useState({
        groupName: '',
        payer: [],
        receiver: [],
        description: '',
        amount: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormArregloValues({
            ...formArregloValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addArreglo(selectedGroup, formArregloValues);
        console.log('Arreglo created:', formArregloValues);
    };


    return (
        <Box
            component="form"
            sx={{
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
                Create New Arreglo
            </Typography>
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formArregloValues.description}
                onChange={handleChange}
                multiline
                rows={2}
                required
            />
            <TextField
                label="amount"
                variant="outlined"
                name="amount"
                value={formArregloValues.amount}
                onChange={handleChange}
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="payer-select-label">Payer</InputLabel>
                <Select
                    labelId="payer-select-label"
                    id="payer"
                    name="payer"
                    single
                    value={formArregloValues.payer}
                    onChange={handleChange}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.name}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="receiver-select-label">Receiver</InputLabel>
                <Select
                    labelId="receiver-select-label"
                    id="receiver"
                    name="Receiver"
                    sinlge
                    value={formArregloValues.receiver}
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
            >
                Create Arreglo
            </Button>
        </Box>
    );
}

export default ArregloForm;