import React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function BasicSpeedDialMod({}) {
    const handleDeleteGroup = () => {
        // Lógica para eliminar grupo (implementación pendiente)
    };

    const handleModifyGroup = () => {
        // Lógica para modificar grupo (implementación pendiente)
    };

    return (
        <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial modify group"
                sx={{
                    '.MuiFab-primary': { backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } },
                }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    key='Eliminar grupo'
                    icon={<DeleteIcon />}
                    tooltipTitle='Eliminar grupo'
                    onClick={handleDeleteGroup}
                />
                <SpeedDialAction
                    key='Modificar grupo'
                    icon={<EditIcon />}
                    tooltipTitle='Modificar grupo'
                    onClick={handleModifyGroup}
                />
            </SpeedDial>
        </Box>
    );
}