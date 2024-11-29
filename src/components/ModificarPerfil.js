import React, { useState, useEffect, useContext } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import imgPerfil from '../assets/perfil.png';
import { AuthContext } from './AuthContext';
import {useNavigate} from 'react-router-dom';

//Falta agregar que la imagen de perfil se pasa como prop para que el nav bar la tenga//
//TODO update del user y delete user

function ModificarPerfil({open, onClose, userData, refreshData}) {

    const {logout} = useContext(AuthContext); // Obtener la función de inicio de sesión desde el contexto
    const navigate = useNavigate();

    // Estado para los datos del usuario, Falta pasar como prop los datos reales
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    //Obtener el user id al abrir el modal
    const currentEmail = sessionStorage.getItem('email');
    const currentName = sessionStorage.getItem('userName');
    const userId = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('access-token');
    const profilePic = sessionStorage.getItem('userPic');

    console.log(token)

    useEffect(() => {
        setEmail(currentEmail || ''); // Usa valores predeterminados si sessionStorage está vacío
        setName(currentName || '');
    }, [currentEmail, currentName]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;
    
                img.onload = () => {
                    // Crear un canvas y redimensionar la imagen
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    // Establecer las dimensiones del canvas a 200x200
                    canvas.width = 200;
                    canvas.height = 200;
    
                    // Dibujar la imagen redimensionada en el canvas
                    ctx.drawImage(img, 0, 0, 200, 200);
    
                    // Obtener la imagen redimensionada en formato Base64
                    const resizedImage = canvas.toDataURL('image/png');
    
                    // Guardar la imagen redimensionada en el estado
                    setProfileImage(resizedImage);
                    console.log(resizedImage); // Muestra la imagen redimensionada en la consola
                };
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    };



    const handleUpdateProfile = async () => {
        try {
            // Crear el cuerpo de la solicitud con los datos actualizados
            const requestBody = {
                id: userId, // ID del usuario, necesario para identificar el registro
                name: name || currentName, // Nuevo nombre o el valor actual
                email: email || currentEmail, // Nuevo email o el valor actual
                password: password, // Nueva contraseña si se proporciona
                picture: profileImage,
            };

            console.log(requestBody);
    
            // Realizar la solicitud PUT para actualizar los datos del usuario
            const response = await fetch('http://localhost:4000/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token, // Token de autorización
                },
                body: JSON.stringify(requestBody),
            });
    
            // Verificar la respuesta del servidor
            if (response.ok) {
                const result = await response.json();
                console.log('Perfil actualizado:', result);
                alert('Perfil actualizado exitosamente');
                onClose(); // Cerrar el modal después de la actualización
                if (typeof refreshData === "function") {
                    refreshData(); // Llama a fetchBudget para recargar datos
                }
                // Opcional: Actualizar la sesión o redirigir al usuario si es necesario
            } else {
                const error = await response.json();
                console.error('Error al actualizar el perfil:', error);
                alert('Hubo un error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error en la solicitud de actualización:', error);
            alert('Hubo un error al actualizar el perfil');
        }
    };


     // Función para eliminar el perfil FALTA AGREGRAR EL AUTHORIZATION
    const handleDeleteProfile = async () => {
        console.log(token);
        try {
            // Solicitud DELETE usando fetch
            const response = await fetch('http://localhost:4000/api/users/delete', {
                method: 'DELETE', // Método de eliminación
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token 
                },
                body: JSON.stringify({ id: userId }), // Enviamos el ID en el cuerpo de la solicitud
            });


            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const result = await response.json();
                console.log(result);  // Mostrar la respuesta en consola
                alert('Perfil eliminado exitosamente');
                onClose(); // Cerrar el modal después de eliminar
                logout();
                navigate('/');

            } else {
                const error = await response.json();
                console.error('Error al eliminar el perfil:', error);
                alert('Hubo un error al eliminar el perfil');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
            alert('Hubo un error al eliminar el perfil');
        }
    };


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
                        src={ profileImage || (profilePic && profilePic !== "null" ? profilePic : imgPerfil) }
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
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />

                <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>

                    {/* Botón para guardar cambios */}
                    <Button 
                        onClick={handleUpdateProfile} 
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
