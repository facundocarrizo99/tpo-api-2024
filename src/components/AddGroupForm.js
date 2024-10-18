import React, {useState, useEffect} from 'react';
import {TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Modal} from '@mui/material';
import {addGroup} from "../GroupBackend";


function GroupForm({open, onClose}) {
    const [formValues, setFormValues] = useState({
        groupName: '',
        users: [],
        description: '',
        profileImage: null,
    });

    const [imagePreview, setImagePreview] = useState(); // Preview de la imagen

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormValues({
            ...formValues,
            profileImage: file,
        });

        // Crear un preview de la imagen seleccionada
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

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
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    p: 4,
                    width: '450px',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Ingresa los datos de tu nuevo Grupo
                </Typography>

                <Box sx={{ my: 2 }}>
                    {imagePreview ? (
                        <Box
                            component="img"
                            src={imagePreview}
                            alt="Profile"
                            sx={{
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                                },
                            }}
                        />
                    ) : (
                        <Typography variant="body1">
                            No hay foto seleccionada
                        </Typography>
                    )}
                    <input
                        id="profile-image-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }} // Ocultar el input
                    />

                    {/* Botón para subir la foto */}
                    <Button
                        variant="contained"
                        color="success"
                        sx={{
                            mt: 2,
                            '&:hover': {
                                transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                            },
                        }}
                        onClick={() => document.getElementById('profile-image-input').click()}
                    >
                        Subir foto de grupo
                    </Button>
                </Box>

                <TextField
                    label="Nombre del Grupo"
                    variant="outlined"
                    name="groupName"
                    value={formValues.groupName}
                    onChange={handleChange}
                    required
                    sx={{ mt: 2, width: '100%' }}
                />

                <TextField
                    label="Descripcion"
                    variant="outlined"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    required
                    sx={{ mt: 2, width: '100%' }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="users-label">Usuarios</InputLabel>
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

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
                    <Button
                            variant="contained"
                            color="success"
                            sx={{
                                mt: 2, marginRight: 2,
                                '&:hover': {
                                    transform: 'scale(1.1)', 
                                },
                            }}
                        >
                            Crear Grupo
                    </Button>

                    <Button 
                        onClick={onClose} 
                        variant="contained" 
                        color="error" 
                        sx={{ mt: 2, color: "white",
                        '&:hover': {
                                    transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                                }}}
                    >
                        Cancelar
                    </Button>
                </div>

            </Box>
        </Modal>
    );
};

export default GroupForm;
