import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, List, MenuItem, Select, TextField, Typography} from "@mui/material";
import {addArreglo} from "../GroupBackend";
import ListItem from "@mui/material/ListItem";

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
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                backgroundColor: '#f4f4f4',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h1" gutterBottom align={"center"}>
                Crear nuevo Arreglo
            </Typography>
            <List sx={{width: '100%', maxWidth: 360}}>
                <ListItem >
                    <TextField
                        label="Description"
                        variant="outlined"
                        name="descripcion"
                        fullWidth={true}
                        value={formArregloValues.description}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        required
                    />
                </ListItem>
                <ListItem >
                    <TextField
                        label="amount"
                        variant="outlined"
                        name="monto"
                        fullWidth={true}
                        value={formArregloValues.amount}
                        onChange={handleChange}
                        required
                    />
                </ListItem>
                <ListItem sx={{width: '100%', maxWidth: 360}}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="payer-select-label">Payer</InputLabel>
                        <Select
                            labelId="payer-select-label"
                            id="payer"
                            name="Quien Paga?"
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
                </ListItem>
                <ListItem sx={{width: '100%', maxWidth: 360}}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="receiver-select-label">Receiver</InputLabel>
                        <Select
                            labelId="receiver-select-label"
                            id="receiver"
                            name="Quien recibe?"
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
                </ListItem>
            </List>
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