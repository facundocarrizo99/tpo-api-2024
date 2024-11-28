import * as React from 'react';
import {Typography, Box, ListItem} from "@mui/material";
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import imgPerfil from '../assets/perfil.png';

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

function ArregloItem({arreglo, users}) {

    const token = sessionStorage.getItem('access-token');
    const actualGroup = JSON.parse(sessionStorage.getItem('actualGroup'));
    const currentUser = sessionStorage.getItem('userName');

    const groupId = actualGroup._id;

    console.log(token);
    console.log(groupId);
    console.log(arreglo._id);

    if (!arreglo || !users) return null; // Si no se pasa la propiedad 'arreglo', no renderizar nada.
    
    const {name, payer, receiver, amount, description, date} = arreglo;

    // Encuentra el nombre del pagador y receptor
    const payerName = users.find(participant => participant._id === payer)?.name || "Unknown";
    const receiverName = users.find(participant => participant._id === receiver)?.name || "Unknown";

    const handleDeleteArreglo = async () => {

        const token = sessionStorage.getItem('access-token');

        console.log(token);
        console.log(groupId);
        console.log(arreglo._id);

        try {
            // Solicitud DELETE usando fetch
            const response = await fetch('http://localhost:4000/api/groups/deleteArreglo', {
                method: 'DELETE', // Método de eliminación
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token,
                    'groupid': groupId,
                },
                body: JSON.stringify({ arregloid: arreglo._id }), // Enviamos el ID en el cuerpo de la solicitud
            });

            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const result = await response.json();
                console.log(result);  // Mostrar la respuesta en consola
                alert('Arreglo eliminado exitosamente');
            } else {
                const error = await response.json();
                console.error('Error al eliminar el arreglo:', error);
                alert('Hubo un error al eliminar el arreglo');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
            alert('Hubo un error al eliminar el arreglo');
        }
    };

    return (
        <div>
            <ListItem alignItems="flex-start" color="#F8F8F8" secondaryAction={
                payerName === currentUser && (
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
                        onClick={handleDeleteArreglo}
                    >
                        <DeleteIcon />
                    </IconButton>
                )
            }>
                <Box
                    component="img"
                    src={imgPerfil} // Imagen por defecto si no hay foto
                    alt={`Foto de perfil de `}
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        marginRight: 2,
                        objectFit: 'cover',
                    }}
                />
                
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ color: '#F8F8F8', display: 'block' }}
                            >
                                {`${payerName} le pagó $${amount} a ${receiverName} por ${name}`}
                            </Typography>
                            <Typography
                                component="span"
                                variant="h7"
                                sx={{ color: '#F8F8F8', display: 'block', marginTop: '4px' }}
                            >
                                -- Descripción: {description}
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
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </div>
    );
}

export default ArregloItem;