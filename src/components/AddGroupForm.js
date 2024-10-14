import React, {useState} from 'react';
import {TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import {addGroup} from "../GroupBackend";

function GroupForm() {
    const [formValues, setFormValues] = useState({
        groupName: '',
        users: [],
        description: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGroup(formValues);
        console.log('Group created:', formValues);
    };

    const usersList = [
        {id: 1, name: 'Santiago'},
        {id: 2, name: 'Facundo'},
        {id: 3, name: 'User 3'},
        {id: 4, name: 'User 4'}
    ];


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
                Create New Group
            </Typography>

            <TextField
                label="Group Name"
                variant="outlined"
                name="groupName"
                value={formValues.groupName}
                onChange={handleChange}
                required
            />

            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formValues.description}
                onChange={handleChange}
                multiline
                rows={2}
                required
            />

            <FormControl fullWidth margin="normal">
                <InputLabel id="users-label">Users</InputLabel>
                <Select
                    labelId="users-label"
                    id="users"
                    name="users"
                    multiple
                    value={formValues.users}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {usersList.map((user) => (
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
                Create Group
            </Button>
        </Box>
    );
};

export default GroupForm;
