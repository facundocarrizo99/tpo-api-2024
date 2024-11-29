import * as React from 'react';
import {Typography, Box, ListItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import imgPerfilDefault from '../assets/perfil.png';
import imgTicketDefault from '../assets/ticket.png';

function formatCustomDate(isoDate) {
    const date = new Date(isoDate);
    // Formatear la fecha (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    // Obtener horas y minutos
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    // Convertir a formato 12 horas
    hours = hours % 12 || 12;
    return `${formattedDate} - ${hours}:${minutes}${period}`;
}

function ExpenseItem({expense, users, refreshData}) {
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCameraClick = () => {
        setOpenDialog(true); // Cambia el estado para mostrar la imagen
    };

    // Función para cerrar el dialogo
    const handleCloseDialog = () => {
        setOpenDialog(false); // Cerrar el dialogo
    };

    const actualGroup = JSON.parse(sessionStorage.getItem('actualGroup'));
    const currentUser = sessionStorage.getItem('userName');
    const picture = expense.ticketPicture;
    console.log(picture);
    

    const groupId = actualGroup._id;

    if (!expense || !users) return null; // Si no se pasa la propiedad 'expense', no renderizar nada.
    
    const {name, owner, amount, description, date} = expense;

    const receivers = expense.participants;

    // Encuentra el nombre del propietario del gasto
    const ownerName = users.find(participant => participant._id === owner)?.name || "Unknown";

    const ownerPic = users.find(participant => participant._id === owner)?.profilePicture;


    // Encuentra los nombres de los receivers
    const receiverNames =  (receivers || []).map(receiverId  => {
        const receiver = users.find(participant => participant._id === receiverId);
        return receiver ? receiver.name : "Unknown";
    }).join(", ");


    const handleDeleteExpense = async () => {

        const token = sessionStorage.getItem('access-token');

        try {
            // Solicitud DELETE usando fetch
            const response = await fetch('http://localhost:4000/api/groups/deleteTicket', {
                method: 'DELETE', // Método de eliminación
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'groupid': groupId,
                },
                body: JSON.stringify({ ticketid: expense._id }), // Enviamos el ID en el cuerpo de la solicitud
            });


            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const result = await response.json();
                console.log(result);  // Mostrar la respuesta en consola
                alert('Gasto eliminado exitosamente');
                if (typeof refreshData === "function") {
                    refreshData(); // Llama a fetchBudget para recargar datos
                }
            

            } else {
                const error = await response.json();
                console.error('Error al eliminar el gasto:', error);
                alert('Hubo un error al eliminar el gasto');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
            alert('Hubo un error al eliminar el gasto');
        }
    };

   


    return (
        <div>
            <ListItem alignItems="flex-start" color="#F8F8F8" secondaryAction={
                ownerName === currentUser && (
                    <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        sx={{
                            color: '#F8F8F8',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                            transform: 'scale(1.2)',
                            }
                        }} 
                    onClick={handleDeleteExpense}
                >
                        <DeleteIcon />
                    </IconButton>
                )
            }>

                <Box
                    component="img"
                    src={ ownerPic|| imgPerfilDefault} // Imagen por defecto si no hay foto
                    alt={`Foto de perfil de ${ownerName}`}
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        marginRight: 2,
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease', 
                        '&:hover': {
                        transform: 'scale(1.2)',
                        }
                        }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            edge="start" 
                            aria-label="camera" 
                            sx={{
                                color: '#F8F8F8',
                                fontSize: '2rem', // Tamaño del ícono
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.2)',
                                }
                            }} 
                            onClick={handleCameraClick} // Función para manejar el clic del ícono de cámara
                            >
                            <CameraAltIcon />
                        </IconButton>
                    </Box>
                
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: '#F8F8F8', display: 'block' }}
                                >
                                {`${ownerName} pagó $${amount} por ${name}`}
                            </Typography>
                            <Typography
                                component="span"
                                variant="h7"
                                sx={{ color: '#F8F8F8', display: 'block', marginTop: '4px' }}
                                >
                                -- Descripcion: {description}
                            </Typography>
                        </React.Fragment>
                    }
                    sx={{color: '#F8F8F8'}}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="h7"
                                sx={{color: '#F8F8F8', display: 'inline'}}
                            >
                                {" — "} {formatCustomDate(date)}
                            </Typography>
                            <Typography
                                component="span"
                                variant="h7"
                                sx={{color: '#F8F8F8', display: 'inline'}}
                            >
                                   {" — Este gasto se divide entre: "} {receiverNames}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>

            {/* Diálogo emergente para mostrar la imagen */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Imagen del Gasto</DialogTitle>
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={picture || imgTicketDefault} 
                        alt={`Imagen del gasto`}
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleCloseDialog} sx={{ color: '#F8F8F8' }}>
                        Cerrar
                    </IconButton>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default ExpenseItem;
