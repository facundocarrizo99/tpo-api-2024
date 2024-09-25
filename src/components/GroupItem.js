import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";

import React from "react";


const GrouopItem = ({budget, showDelete = false}) => {
    const {name, description, users, expenses} = budget;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {users.length} members
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {expenses.length} expenses
                    </Typography>
                    {showDelete && (
                        <Button variant="contained" color="error">
                            Delete
                        </Button>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
export default GrouopItem;
