import React, {useState, useEffect} from 'react';
import {TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, Modal} from '@mui/material';

function GroupForm({open, onClose}) {
    const [formValues, setFormValues] = useState({
        groupName: '',
        users: [],
        description: '',
        profileImage: null,
    });

    const [imagePreview, setImagePreview] = useState(); // Preview de la 

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar que el nombre y la descripción estén llenos
        if (!formValues.groupName || !formValues.description) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        const token = sessionStorage.getItem('access-token');

        // Crear un objeto con los valores del formulario
        const newGroup = {
        name: formValues.groupName,
        description: formValues.description,
        users: formValues.users,  // Se asume que 'users' ya está en el formato correcto
        profileImage: formValues.profileImage
    };

    
        try {
            // Hacemos el POST al backend
            const response = await fetch('http://localhost:4000/api/groups/create', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
                },
                body: JSON.stringify(newGroup),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Grupo creado:', data);
    
                // Si el grupo se crea correctamente, cerramos el modal
                onClose();
                // Reseteamos el formulario
                setFormValues({
                    groupName: '',
                    users: [],
                    description: '',
                    profileImage: null,
                });
                setImagePreview(null);
            } else {
                const data = await response.json();
                console.error('Error al crear el grupo:', data.message);
                alert('Hubo un error al crear el grupo. Intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Hubo un error al intentar crear el grupo. Intenta nuevamente.');
        }
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    p: 4,
                    width: 450,
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
                    </Select>
                </FormControl>

                {/* Formulario para hacer un fetch de todos los usuarios de la base de datos
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
                            <MenuItem key={user._id} value={user.name}>
                                {user.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>*/}

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>
                    <Button
                            onClick={handleSubmit}
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
