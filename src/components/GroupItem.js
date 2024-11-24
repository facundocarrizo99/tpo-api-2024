import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import React from "react";

const GroupItem = ({budget, showDelete = false}) => {
    const { name, description, expenses, participants} = budget;

    const handleClick = () => {
        // Guardar el ID del grupo en sessionStorage y redirigir al grupo específico
        sessionStorage.setItem('actualGroup', JSON.stringify(budget));
        console.log(JSON.stringify(budget));

      };

    return (
        <Card  sx={{maxWidth: 345, position: 'relative', transition: 'transform 0.3s ease',  '&:hover': {transform: 'scale(1.05)',},}}>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {participants.length} Miembros
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {expenses.length} Gastos
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default GroupItem;
