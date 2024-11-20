import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import React from "react";



const GrouopItem = ({budget, showDelete = false}) => {
    const {groupName, description, users = [], expenses = []} = budget;



    return (
        <Card  sx={{maxWidth: 345, position: 'relative', transition: 'transform 0.3s ease',  '&:hover': {transform: 'scale(1.05)',},}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {groupName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {users.length} members
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {expenses.length} expenses
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default GrouopItem;
