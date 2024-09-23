import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ExpenseItem({ expense }) {
    if (!expense) return null; // Si no se pasa la propiedad 'expense', no renderizar nada.

    const { user, description, amount, date } = expense;

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={user} src=<AccountCircleIcon/> />
                </ListItemAvatar>
                <ListItemText
                    primary={user}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {amount}
                            </Typography>
                            {description}, {date}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    );
}

export default ExpenseItem;
