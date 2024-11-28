import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';

function ModificarGrupo({ open, onClose, groupData, onGroupUpdate, onGroupDelete }) {

  const navigate = useNavigate();
  
  const token = sessionStorage.getItem('access-token');
  const actualGroup = JSON.parse(sessionStorage.getItem('actualGroup'));
  const actualName = actualGroup.name;
  const actualDescription = actualGroup.description;
  const actualGroupId = actualGroup._id;
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  // Cargar los datos del grupo cuando el modal está abierto
  useEffect(() => {
    setName(actualName || '');
    setDescription(actualDescription || '');
    //setImagePreview(groupData.image || '/default-group.png'); // Imagen del grupo o por defecto
}, [actualName, actualDescription]);



  const handleUpdateGroup = async (groupId) => {
    try {
        // Crear el cuerpo de la solicitud con solo el nombre y la descripción actualizados
        const requestBody = {
            name: name || actualName,
            description: description || actualDescription,
        };

        console.log(requestBody);

        // Realizar la solicitud PUT para actualizar los datos del grupo, pasando el groupId en la URL
        const response = await fetch(`http://localhost:4000/api/groups/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token, 
                'groupid': actualGroupId,
            },
            body: JSON.stringify(requestBody),
        });

        // Verificar la respuesta del servidor
        if (response.ok) {
            const result = await response.json();
            console.log('Grupo actualizado:', result);
            alert('Grupo actualizado exitosamente');
            onClose(); // Cerrar el modal después de la actualización
            navigate('/Home');
        } else {
            const error = await response.json();
            console.error('Error al actualizar el grupo:', error);
            alert('Hubo un error al actualizar el grupo');
        }
    } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
        alert('Hubo un error al actualizar el grupo');
    }
};

const handleDeleteGroup = async (groupId) => {
  try {
      // Realizar la solicitud DELETE para eliminar el grupo, pasando el groupId en la URL
      const response = await fetch(`http://localhost:4000/api/groups/delete`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,  // El token de autenticación
              'groupid': actualGroupId,
          },
      });

      // Verificar la respuesta del servidor
      if (response.ok) {
          const result = await response.json();
          console.log('Grupo eliminado:', result);
          alert('Grupo eliminado exitosamente');
          onClose(); // Cerrar el modal después de la eliminación
          navigate('/Home');
      } else {
          const error = await response.json();
          console.error('Error al eliminar el grupo:', error);
          alert('Hubo un error al eliminar el grupo');
      }
  } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
      alert('Hubo un error al eliminar el grupo');
  }
};



  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: 'white',
          borderRadius: '8px',
          p: 4,
          width: '400px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Typography variant="h6" color="black" sx={{ mt: 2 }}>
          Modificar Grupo
        </Typography>

        {/* Campos para nombre y descripción */}
        <TextField
          label="Nombre del Grupo"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2, width: '100%' }}
        />

        {/* Botones */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, width: '100%' }}>
          <Button
            onClick={handleUpdateGroup}
            variant="contained"
            color="success"
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            Guardar
          </Button>
          <Button
            onClick={handleDeleteGroup}
            variant="contained"
            color="error"
            sx={{
              color: "white",
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            Eliminar Grupo
          </Button>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            sx={{
              color: "white",
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            Cancelar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModificarGrupo;