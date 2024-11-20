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

    const [imagePreview, setImagePreview] = useState(); // Preview de la 
    //const [usersList, setUsersList] = useState([]); // Lista de usuarios obtenidos desde el backend
    
    

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

    /*useEffect(() => {
        // Obtener los usuarios al cargar el componente
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users?page=${page}&limit=10`);
                const data = await response.json();
                if (response.ok) {
                    setUsersList(data.docs);  // Suponiendo que 'docs' es el array de usuarios
                    setTotalUsers(data.total); // Total de usuarios para la paginación
                } else {
                    throw new Error('No se pudieron cargar los usuarios');
                }
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setError('Error al cargar los usuarios');
            }
        };

        fetchUsers();
    }, [page]); // Vuelve a ejecutar cuando la página cambie

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos del formulario
        if (!formValues.groupName || !formValues.email || !formValues.description) {
            setError("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);  // Iniciar el estado de carga

        // Crear FormData
        const formData = new FormData();
        formData.append('name', formValues.groupName);
        formData.append('email', formValues.email);
        formData.append('description', formValues.description);
        formData.append('users', formValues.users.join(','));  // Convertir array a string
        if (formValues.profileImage) {
            formData.append('profileImage', formValues.profileImage);
        }

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al crear el grupo: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Grupo creado:', data);

            // Si el backend devuelve un token o mensaje, guardarlo
            if (data.token) {
                localStorage.setItem('groupToken', data.token);  // Guardar token si es necesario
            }

            // Resetear formulario y cerrar modal
            onClose();
            setFormValues({
                groupName: '',
                email: '',
                description: '',
                users: [],
                profileImage: null,
            });
            setImagePreview(null);
            setError(null);  // Limpiar errores
        } catch (error) {
            console.error('Error al crear el grupo:', error);
            setError("Hubo un error al intentar crear el grupo. Intenta nuevamente.");
        } finally {
            setLoading(false);  // Terminar el estado de carga
        }
    }*/
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addGroup(formValues);
        console.log('Group created:', formValues);
        onClose();
        setFormValues({ // Resetea los valores del formulario.
            groupName: '',
            users: [],
            description: '',
            profileImage: null
        });
        
    };

    //Agregar logica para mostrar en el form el array de usuarios registrados para la creacion del grupo
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
                        {usersList.map((user) => (
                            <MenuItem key={user.id} value={user.name}>
                                {user.name}
                            </MenuItem>
                        ))}
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
