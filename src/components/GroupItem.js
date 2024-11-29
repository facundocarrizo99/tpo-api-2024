import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import fondoGrupo2 from '../assets/2.png';
import fondoGrupo3 from '../assets/3.png';
import fondoGrupo4 from '../assets/4.png';
import fondoGrupo5 from '../assets/5.png';
import fondoGrupo6 from '../assets/img1.jpg';
import fondoGrupo7 from '../assets/7.png';
import fondoGrupo8 from '../assets/8.png';
import fondoGrupo9 from '../assets/9.png';
import fondoGrupo10 from '../assets/10.png';

const GroupItem = ({budget, showDelete = false}) => {
    const { name, description, expenses, participants} = budget;

    const handleClick = () => {
        // Guardar el ID del grupo en sessionStorage y redirigir al grupo específico
        sessionStorage.setItem('actualGroup', JSON.stringify(budget));
        console.log(JSON.stringify(budget));

      };

      const getBackgroundImage = (participantCount) => {
        if (participantCount >= 10) return fondoGrupo10;
        switch (participantCount) {
          case 2:
            return fondoGrupo2;
          case 3:
            return fondoGrupo3;
          case 4:
            return fondoGrupo4;
          case 5:
            return fondoGrupo5;
          case 6:
            return fondoGrupo6;
          case 7:
            return fondoGrupo7;
          case 8:
            return fondoGrupo8;
          case 9:
            return fondoGrupo9;
          default:
            return fondoGrupo2; // Imagen por defecto si no coincide con ningún caso
        }
      };


    return (
        <Card  sx={{maxWidth: 345, position: 'relative', transition: 'transform 0.3s ease',  '&:hover': {transform: 'scale(1.05)',},}}>
            <CardActionArea onClick={handleClick}>
            <CardMedia
                    component="img"
                    height="140" // Ajusta la altura según sea necesario
                    image={getBackgroundImage(participants.length)}
                    alt="Background image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
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
