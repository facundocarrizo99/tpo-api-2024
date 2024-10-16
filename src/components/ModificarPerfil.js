import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Avatar, MenuItem } from '@mui/material';
import imgPerfil from '/Users/Santiago/tpo-api-2024/src/assets/perfil.png'

//Falta agregar que la imagen de perfil se pasa como prop para que el nav bar la tenga//

function ModificarPerfil({open, onClose, userData}) {

    const [imagePreview, setImagePreview] = useState(imgPerfil); // Estado para la vista previa de la imagen

    // Estado para los datos del usuario, Falta pasar como prop los datos reales
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleDeleteProfile = () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.")) {
            // Aquí puedes llamar a la función para eliminar el perfil
            // Asegúrate de implementar esta función en el componente padre
            onClose();   // Cerrar el modal después de eliminar
        }
    };

  return (
    <Modal open={open} onClose={onClose}>
            <Box
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
                        onClick={handleDeleteProfile} 
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
