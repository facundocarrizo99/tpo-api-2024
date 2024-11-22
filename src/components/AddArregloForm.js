import React, {useState} from "react";
import {Box, Button, FormControl, InputLabel, List, MenuItem, Select, TextField, Typography} from "@mui/material";
import {addArreglo} from "../GroupBackend";
import ticket from '../assets/ticket.png';


function ArregloForm({users, selectedGroup, onClose}) {
    const [formArregloValues, setFormArregloValues] = useState({
        groupName: '',
        payer: [],
        receiver: [],
        description: '',
        amount: 0,
        ticketImage: null,
    });

    const [ticketImage, setTicketImage] = useState(null); // Estado para almacenar la imagen

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormArregloValues({
            ...formArregloValues,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTicketImage(reader.result); // Guardar la imagen en el estado
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        addArreglo(selectedGroup, formArregloValues);
        console.log('Arreglo created:', formArregloValues);
        onClose();
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
                        <InputLabel id="payer-select-label">Persona que Paga</InputLabel>
                        <Select
                            labelId="payer-select-label"
                            id="payer"
                            name="payer"
                            single
                            value={formArregloValues.payer}
                            onChange={handleChange}
                            sx={{ mt: 2, width: '100%' }}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.name}>
                                    {user.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
               
              
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
                            {users.map((user) => (
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