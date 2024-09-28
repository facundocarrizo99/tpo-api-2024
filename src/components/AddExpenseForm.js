import React, {useState} from 'react';
import {TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, List, Box} from '@mui/material';
import {addExpense} from "../GroupBackend";
import * as PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";

function CloudUploadIcon() {
    return null;
}

function VisuallyHiddenInput(props) {
    return null;
}

VisuallyHiddenInput.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    multiple: PropTypes.bool
};

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
        <Box
            style={{
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
                Crear nuevo Gasto
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem sx={{ width: '100%', maxWidth: 360 }}>
                    <TextField
                        label="Description"
                        variant="outlined"
                        name="descripcion"
                        fullWidth={true}
                        value={formExpenseValues.description}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        required
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        label="amount"
                        variant="outlined"
                        name="amount"
                        fullWidth={true}
                        value={formExpenseValues.amount}
                        onChange={handleChange}
                        required
                    />
                </ListItem>

                <ListItem>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="payer-select-label">Payer</InputLabel>
                        <Select
                            labelId="payer-select-label"
                            id="payer"
                            name="Quien pago?"
                            fullWidth={true}
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
                </ListItem>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
            </List>


            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{mt: 2}}
                onClick={handleSubmit}
            >
                Create Gasto
            </Button>
        </Box>
    )
        ;
}

export default AddExpenseForm;
