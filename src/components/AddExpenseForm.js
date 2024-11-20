import React, {useState} from 'react';
import {TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, List, Box} from '@mui/material';
import {addExpense} from "../GroupBackend";
import * as PropTypes from "prop-types";
import ticket from '/Users/Santiago/Desktop/API/tpo-api-2024/src/assets/ticket.png'


function CloudUploadIcon() {
    return null;
}

function VisuallyHiddenInput(props) {
    return null;
}

VisuallyHiddenInput.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
    multiple: PropTypes.bool
};

function AddExpenseForm({users, selectedGroup, onClose}) {
    const [formExpenseValues, setFormExpenseValues] = useState({
        groupName: selectedGroup,
        payer: [],
        description: '',
        amount: 0,
        ticketImage: null,
    });

    const [ticketImage, setTicketImage] = useState(null); // Estado para almacenar la imagen
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormExpenseValues({
            ...formExpenseValues,
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
        addExpense(selectedGroup, formExpenseValues);
        console.log('Arreglo created:', formExpenseValues);
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
                    label="amount"
                    variant="outlined"
                    name="amount"
                    fullWidth={true}
                    value={formExpenseValues.amount}
                    onChange={handleChange}
                    required
                    sx={{ mt: 2, width: '100%' }}
                    />
               
                <FormControl fullWidth margin="normal">
                    <InputLabel id="payer-select-label">Payer</InputLabel>
                    <Select
                        labelId="payer-select-label"
                        id="payer"
                        name="payer"
                        fullWidth={true}
                        value={formExpenseValues.payer}
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
