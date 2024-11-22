import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import imgPerfil from '../assets/perfil.png';
//import axios from 'axios';  // Asegúrate de tener axios instalado

//Falta agregar que la imagen de perfil se pasa como prop para que el nav bar la tenga//

function ModificarPerfil({open, onClose, userData}) {

    const [imagePreview, setImagePreview] = useState(imgPerfil); // Estado para la vista previa de la imagen

    // Estado para los datos del usuario, Falta pasar como prop los datos reales
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    // Efecto para cargar los datos del usuario cuando se abre el modal
    useEffect(() => {
        if (open && userData) {
            setName(userData.name);
            setSurname(userData.surname);
            setEmail(userData.email);
            // No cargamos la contraseña por razones de seguridad
            setImagePreview(userData.profileImage || '/default-profile.png'); // Establecer imagen de perfil
        }
    }, [open, userData]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Establecer la imagen de vista previa
            };
            reader.readAsDataURL(file);
        }
    };

    //Funcion Update
    /*const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('id', userData.id);
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('email', email);
            formData.append('password', password);
            if (profileImage) {
                formData.append('profileImage', profileImage);  // Agregar la imagen si se cambió
            }

            // Hacer la solicitud al backend para actualizar el usuario
            const response = await axios.put('/api/users/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Importante cuando se envían archivos
                },
            });

            console.log('Usuario actualizado:', response.data);
            onClose();  // Cerrar el modal después de guardar
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
        }
    };*/

    /*const handleDeleteProfile = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.")) {
            try {
                const response = await axios.delete(`/api/users/delete/${userData.id}`);
                console.log('Perfil eliminado:', response.data);
                onClose();  // Cerrar el modal después de eliminar
            } catch (error) {
                console.error('Error al eliminar el perfil:', error);
            }
        }
    };*/

  return (
    <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    p: 4,
                    width: '400px',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
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
                    sx={{ mt: 2,
                    '&:hover': {
                                transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                            } }} 
                    onClick={() => document.getElementById('profile-image-input').click()}
                    
                >
                    Cambiar Foto de perfil
                </Button>

                <Typography variant="h6" color="black" sx={{ mt: 2 }}>Modificar Perfil</Typography>
                
                {/* Campos de texto para los datos del usuario */}
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>

                    {/* Botón para guardar cambios */}
                    <Button 
                        onClick={onClose} 
                        variant="contained" 
                        color="success" 
                        sx={{ mt: 2, marginRight: 1 , 
                        '&:hover': {
                                    transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                                }}}
                    >
                        Guardar
                    </Button>

                    {/* Botón para eliminar perfil */}
                    <Button 
                        onClick={onClose} 
                        variant="contained"  
                        color="error"
                        sx={{ mt: 2, marginRight: 1 , color: "white",
                        '&:hover': {
                                    transform: 'scale(1.1)', // Efecto de zoom al pasar el cursor
                                }}}
                    >
                        Eliminar Perfil
                    </Button>

                    {/* Botón para cancelar */}
                    <Button 
                        onClick={onClose} 
                        variant="contained" 
                        color="error"
                        sx={{ mt: 2, marginRight: 1, color: "white",
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

export default ModificarPerfil;
