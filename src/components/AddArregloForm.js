import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import { useNavigate } from 'react-router';
 


function ArregloForm({onClose}) {

    const navigate = useNavigate();

    const actualGroup = JSON.parse(sessionStorage.getItem('actualGroup'));
    const groupId = actualGroup._id;
    const groupName = actualGroup.name;
    const users = actualGroup ? actualGroup.participants : []; 
    const user_id = sessionStorage.getItem('user_id');
    const token = sessionStorage.getItem('access-token');
    const currentEmail = sessionStorage.getItem('email');
    const currentName = sessionStorage.getItem('userName');


    const [formArregloValues, setFormArregloValues] = useState({
        name: '',
        payer: '',
        receiver: '',
        description: '',
        amount: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormArregloValues({
            ...formArregloValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { name, receiver, description, amount } = formArregloValues;
    
        // Validación simple para asegurarse de que todos los campos estén completos
        if (!receiver || !name  || !description || amount <= 0) {
          alert("Por favor, completa todos los campos.");
          return;
        }

        const receiverEmail = users.find((user) => user.name === formArregloValues.receiver)?.email || null;
    
        try {
          // Llamada al backend para agregar el gasto
          const arregloData = { 
            name: name, 
            description: description, 
            payer: currentEmail, 
            receiver: receiverEmail, 
            amount: amount,  
        }; 
          
          console.log("Datos que se enviarán al backend:", JSON.stringify(arregloData, null, 2));

          const response = await fetch('http://localhost:4000/api/groups/createArreglo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token, // Token de autorización
              'groupid': groupId,
            },
            body: JSON.stringify(arregloData),
          });
    
          // Manejo de la respuesta del backend
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.message || 'Hubo un problema al agregar el arreglo.'}`);
            return;
          }
    
          alert("Arreglo agregado exitosamente");
          // Redirigir a la página de grupo después de agregar el gasto
          onClose();
          navigate(`/group/${groupName}`)
        } catch (error) {
          console.error("Error al agregar el arreglo:", error);
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
                Crear nuevo Arreglo
            </Typography>
            
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        fullWidth={true}
                        value={formArregloValues.name}
                        onChange={handleChange}
                        multiline
                        rows={1}
                        required
                        sx={{ mt: 2, width: '100%' }}
                    />
                    
                    <TextField
                        label="Descripcion"
                        variant="outlined"
                        name="description"
                        fullWidth={true}
                        value={formArregloValues.description}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        required
                        sx={{ mt: 2, width: '100%' }}
                    />
                
                    <TextField
                        label="Monto"
                        variant="outlined"
                        name="amount"
                        fullWidth={true}
                        type="number" // Asegúrate de que sea un número
                        value={formArregloValues.amount}
                        onChange={handleChange}
                        required
                        sx={{ mt: 2, width: '100%' }}
                    />
               
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="receiver-select-label">Persona que Recibe</InputLabel>
                        <Select
                            labelId="receiver-select-label"
                            id="receiver"
                            name="receiver"
                            sinlge
                            value={formArregloValues.receiver}
                            onChange={handleChange}
                            sx={{ mt: 2, width: '100%' }}
                        >
                            {users
                                .filter(user => user.name !== currentName) 
                                .map((user) => (
                                    <MenuItem key={user.id} value={user.name}>
                                        {user.name}
                                    </MenuItem>
                            ))}
                        </Select>
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
                >
                    Subir Arreglo
                </Button>
                <Button
                    type="submit"
                    onClick={onClose}
                    variant="contained"
                    color="error"
                    sx={{
                                mt: 2,
                                '&:hover': {
                                    transform: 'scale(1.1)', 
                                },
                            }}
                >
                    cancelar
                </Button>
            </div>
        </Box>
    );
}

export default ArregloForm;