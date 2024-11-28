import React, {useState} from 'react';
import {TextField, Button, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Box} from '@mui/material';
import ticket from '../assets/ticket.png';
import { useNavigate } from 'react-router';

function AddExpenseForm({onClose}) {

    const navigate = useNavigate();

    const actualGroup = JSON.parse(sessionStorage.getItem('actualGroup'));
    const groupId = actualGroup._id;
    const groupName = actualGroup.name;
    const users = actualGroup ? actualGroup.participants : []; 
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('access-token');
    const currentEmail = sessionStorage.getItem('email');
    
    const [formExpenseValues, setFormExpenseValues] = useState({
        recievers: [],
        description: '',
        name: '',
        amount: 0,
        ticketImage: '',
        selectedUsers: [] // Asegúrate de que `selectedUsers` esté inicializado como un arreglo vacío
    });


    const [ticketImage, setTicketImage] = useState(null); // Estado para almacenar la imagen
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormExpenseValues({
            ...formExpenseValues,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e, userName) => {
        const { checked } = e.target;
        setFormExpenseValues((prevState) => {
            const updatedSelectedUsers = checked
                ? [...prevState.selectedUsers, userName] // Agregar si está seleccionado
                : prevState.selectedUsers.filter((name) => name !== userName); // Eliminar si está desmarcado
    
            console.log('Updated selectedUsers:', updatedSelectedUsers); // Log para revisar
    
            return {
                ...prevState,
                selectedUsers: updatedSelectedUsers, // Actualiza selectedUsers
            };
        });
    };
    

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
                    setTicketImage(resizedImage);
                    console.log(resizedImage); // Muestra la imagen redimensionada en la consola
                };
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { recievers, description, name, amount } = formExpenseValues;
    
        // Validación simple para asegurarse de que todos los campos estén completos
        if (!recievers || !description || amount <= 0) {
          alert("Por favor, completa todos los campos.");
          return;
        }

        // Convertir los nombres seleccionados a correos electrónicos
        const updatedRecievers = formExpenseValues.selectedUsers.map((userName) => {
            const user = users.find((user) => user.name === userName);
            return user ? user.email : null; // Mapear a correo si existe el usuario
        }).filter((email) => email !== null); // Filtramos los valores nulos

        console.log(updatedRecievers)

        // Validar que tengamos correos electrónicos antes de enviar
        if (updatedRecievers.length === 0) {
            alert("Por favor, selecciona al menos un usuario.");
            return;
    }
    
        try {
          // Llamada al backend para agregar el gasto
          const expenseData = { 
            name: name, 
            description: description, 
            owner: currentEmail, 
            participants: updatedRecievers, 
            picture: ticketImage,
            amount: amount,  
        }; 
          
          console.log("Datos que se enviarán al backend:", JSON.stringify(expenseData, null, 2));
          console.log(ticketImage)

          const response = await fetch('http://localhost:4000/api/groups/createTicket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token, // Token de autorización
              'groupid': groupId,
            },
            body: JSON.stringify(expenseData),
          });
    
          // Manejo de la respuesta del backend
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Hubo un problema al agregar el gasto.'}`);
            return;
          }
    
          alert("Gasto agregado exitosamente");
          // Redirigir a la página de grupo después de agregar el gasto
          onClose();
          navigate(`/group/${groupName}`);
        } catch (error) {
          console.error("Error al agregar el gasto:", error);
          alert("Error al conectar con el servidor.");
        }
      };



    return (
        <Box
            component="form"
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 450,
                backgroundColor: 'white',
                borderRadius: "8px",
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" component="h1" gutterBottom align={"center"} color="#101010">
                Crear nuevo Gasto
            </Typography>

            <Box
                        component="img"
                        src={ticketImage || ticket}
                        alt="ticket"
                        sx={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '4px',
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
                        onChange={handleImageChange} // Manejar el cambio de imagen
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
                    Subir Ticket
                </Button>

                <TextField
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    fullWidth={true}
                    value={formExpenseValues.name}
                    onChange={handleChange}
                    multiline
                    rows={1}
                    required
                    sx={{ mt: 2, width: '100%' }}
                    />
            
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    fullWidth={true}
                    value={formExpenseValues.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    required
                    sx={{ mt: 2, width: '100%' }}
                    />
               
                <TextField
                    label="Monto (use coma para los centavos. Ejemplo: 100,50)"
                    variant="outlined"
                    name="amount"
                    fullWidth={true}
                    type="number" 
                    value={formExpenseValues.amount}
                    onChange={handleChange}
                    required
                    sx={{ mt: 2, width: '100%' }}
                    />
               

                <FormControl component="fieldset" fullWidth margin="normal">
                    <Typography variant="subtitle1" gutterBottom>
                        Dividido entre:
                    </Typography>
                    <FormGroup>
                        {users.map((user) => (
                            <FormControlLabel
                                key={user.id}
                                control={
                                    <Checkbox
                                        checked={formExpenseValues.selectedUsers.includes(user.name)}
                                        onChange={(e) => handleCheckboxChange(e, user.name)}
                                    name={user.name}
                                />
                            }
                            label={user.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            
            <div style={{display: "flex", justifyContent: "space-between", marginTop: 20}}>

                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                                mt: 2, marginRight: 2,
                                '&:hover': {
                                    transform: 'scale(1.1)', 
                                },
                            }}
                    onClick={handleSubmit}
                    >
                    Subir Gasto
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{
                                mt: 2, marginRight: 2,
                                '&:hover': {
                                    transform: 'scale(1.1)', 
                                },
                            }}
                    onClick={onClose}
                    >
                    Cancelar
                </Button>

            </div>
        </Box>
    )
        ;
}

export default AddExpenseForm;
