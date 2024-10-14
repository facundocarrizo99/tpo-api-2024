import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


function ExpenseItem({expense}) {
    if (!expense) return null; // Si no se pasa la propiedad 'expense', no renderizar nada.
    //const {groupName} = useParams();
    const {id, user, description, amount, date} = expense;

    //todo Agregar funcionalidad para eliminar gasto
    return (
        <div>
            <ListItem alignItems="flex-start" color="#F8F8F8" secondaryAction={
                <IconButton edge="end" aria-label="delete" sx={{color: '#F8F8F8'}}>
                    <DeleteIcon />
                </IconButton>
            }>
                <ListItemAvatar>
                    <Avatar alt={user} src=<AccountCircleIcon/> />
                </ListItemAvatar>
                <ListItemText
                    primary={user}
                    sx={{color: '#F8F8F8'}}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{color: '#F8F8F8', display: 'inline'}}
                            >
                                $ {amount}
                            </Typography>
                            <Typography
                                component="span"
                                variant="h8"
                                sx={{color: '#F8F8F8', display: 'inline'}}
                            >
                                   {" — Descripcion: "} {description} {" — Fecha: "} {date}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li"/>
        </div>
    );
}

export default ExpenseItem;
