import React, {useState, useEffect} from 'react';
import {TextField, Button, Box, Typography, FormControl, Modal, Chip} from '@mui/material';

function GroupForm({open, onClose, refreshData}) {
    const [formValues, setFormValues] = useState({
        groupName: '',
        users: [],
        description: '',
    });


    const [imagePreview, setImagePreview] = useState(); // Preview de la 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const [emailInput, setEmailInput] = useState(''); // Almacena el correo actual ingresado

    // Manejar el cambio en el campo de correo
    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    // Agregar el correo a la lista de usuarios
    const handleAddEmail = () => {
        if (emailInput.trim() && !formValues.users.includes(emailInput.trim())) {
            setFormValues({
                ...formValues,
                users: [...formValues.users, emailInput.trim()],
            });
            setEmailInput(''); // Limpiar el campo de correo después de agregarlo
        }
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
        participants: formValues.users,  // Se asume que 'users' ya está en el formato correcto
    };

    console.log(newGroup);

    
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
                if (typeof refreshData === "function") {
                    refreshData(); // Llama a fetchBudget para recargar datos
                }
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
                    <TextField
                        id="users"
                        label="Correo de usuarios"
                        variant="outlined"
                        value={emailInput}
                        onChange={handleEmailChange}
                        helperText="Ingresa correos electrónicos de usuarios"
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleAddEmail}
                    >
                        Agregar correo
                    </Button>

                    <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {formValues.users.map((email, index) => (
                            <Chip key={index} label={email} />
                        ))}
                    </Box>

                </FormControl>
            

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
