import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import imgGrupo from '../assets/grupo.png';

function ModificarGrupo({ open, onClose, groupData, onGroupUpdate, onGroupDelete }) {
  const [imagePreview, setImagePreview] = useState(imgGrupo); // Imagen por defecto
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // Cargar los datos del grupo cuando el modal está abierto
  useEffect(() => {
    if (open && groupData) {
      setName(groupData.name);
      setDescription(groupData.description);
      setImagePreview(groupData.image || '/default-group.png'); // Imagen del grupo o por defecto
    }
  }, [open, groupData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Actualizar la vista previa
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onGroupUpdate) {
      onGroupUpdate({ name, description, image: imagePreview }); // Enviar los datos actualizados
    }
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este grupo? Esta acción no se puede deshacer.")) {
      if (onGroupDelete) {
        onGroupDelete(groupData.id); // Notificar la eliminación del grupo
      }
      onClose();
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
        {/* Vista previa de la imagen */}
        <Box
          component="img"
          src={imagePreview}
          alt="Group"
          sx={{
            width: '200px',
            height: '200px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)', // Zoom al pasar el cursor
            },
          }}
        />
        <input
          id="group-image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <Button
          variant="contained"
          color="success"
          sx={{
            mt: 2,
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => document.getElementById('group-image-input').click()}
        >
          Cambiar Imagen
        </Button>

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
            onClick={handleSave}
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
            onClick={handleDelete}
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