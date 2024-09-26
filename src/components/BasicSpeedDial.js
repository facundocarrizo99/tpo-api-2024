import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/Add';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Modal from "@mui/material/Modal";
import AddExpenseForm from "./AddExpenseForm";
import AddArregloForm from "./AddArregloForm";
import {useParams} from "react-router-dom";
import {findGroupByName} from "../GroupBackend";


export function BasicSpeedDial({}) {
    const [openExpenseForm, setOpenExpenseForm] = React.useState(false);
    const [openArregloForm, setOpenArregloForm] = React.useState(false);
    const handleOpenAddExpenseForm = () => setOpenExpenseForm(true);
    const handleOpenAddArregloForm = () => setOpenArregloForm(true);
    const handleCloseExpenseForm = () => setOpenExpenseForm(false);
    const handleCloseArregloForm = () => setOpenArregloForm(false);
    const {groupName} = useParams(); // Captura el parámetro de la URL
    const group = findGroupByName(groupName);
    const users = group ? group.users : [];


    return (
        <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{position: 'absolute', bottom: 16, right: 16}}
                icon={<SpeedDialIcon/>}
            >
                <SpeedDialAction
                    key='Agregar un Gasto'
                    icon={<AddIcon/>}
                    tooltipTitle='Agregar un Gasto'
                    onClick={handleOpenAddExpenseForm}
                />
                <SpeedDialAction
                    key='Arreglar gastos'
                    icon={<HandshakeIcon/>}
                    tooltipTitle='Arreglar gastos'
                    onClick={handleOpenAddArregloForm}
                />
            </SpeedDial>
            <Modal
                open={openExpenseForm}
                onClose={handleCloseExpenseForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddExpenseForm users={users} selectedGroup={groupName}/>
            </Modal>
            <Modal
                open={openArregloForm}
                onClose={handleCloseArregloForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddArregloForm users={users} selectedGroup={groupName}/>
            </Modal>
        </Box>
    );
}