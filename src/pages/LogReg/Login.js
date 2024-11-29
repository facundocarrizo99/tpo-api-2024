import React, {useState, useContext} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const Login = ({ searchUser}) => {
  //Cambiar username por email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useContext(AuthContext); // Obtener la función de inicio de sesión desde el contexto
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [safetyAnswer, setSafetyAnswer] = useState(""); // Estado para la pregunta de seguridad
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverPasswords, setRecoverPasswords] = useState("");


  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar modal y ejecutar el registro
    recoverPassword(recoverEmail, safetyAnswer, recoverPasswords);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false); // Cierra el modal al hacer clic en "Cancelar"
  };

  //Tomo valores para hacer la llamada a la base de datos
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
  
    // Mostrar los valores de email y password
    console.log('Email:', email);
    console.log('Password:', password);
  
    const body = {
      email: email,
      password: password,
    };
    console.log("Request Body:", body); 
  
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        if (response.status === 400) {
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        } else {
          alert('Error en el servidor. Intenta más tarde.');
        }
        return;
      }
  
      // Parsear la respuesta del backend
      const data = await response.json();
      console.log('Respuesta JSON:', data);

      const token = data.loginUser.token;
      const userId = data.loginUser.user._id;
      const email = data.loginUser.user.email;
      const userName = data.loginUser.user.name;
      const userPicture = data.loginUser.user.profilePicture;
      const safetyAnswer = data.loginUser.user.safetyAnswer;
    

      // Guardar el token e ID del usuario en sessionStorage
      sessionStorage.setItem('access-token', token);
      sessionStorage.setItem('user_id', userId);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userPic', userPicture);
      sessionStorage.setItem('safetyAnswer', safetyAnswer);
      console.log('Token y User ID guardados en sessionStorage:', token, userId, email, userName, userPicture, safetyAnswer);

      login();
      
      // Redirigir al usuario a la página principal
      navigate('/Home');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  const recoverPassword = async (email, safetyAnswer, recoverPasswords) => {

    const recoverUser = { email, safetyAnswer };

    console.log(recoverUser);

    try {
      const response = await fetch('http://localhost:4000/api/users/recoverPassword', {
        method: 'POST', // Método HTTP para enviar datos
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos en formato JSON
        },
        body: JSON.stringify(recoverUser),
      });
  
      const data = await response.json();
      console.log('Respuesta JSON:', data);

  
      // Verifica si la respuesta es exitosa
      if (response.ok) {
        console.log(data)
        handleUpdateProfile(data, recoverPasswords);
      } else {
        // En caso de error en el backend
        alert("Error en la recuperacion");
        console.error('Error en la recuperación:', data.message);
        // Muestra el error en la interfaz
      }
    } catch (error) {
      // Manejo de errores de red o problemas con la solicitud
      console.error('Error al hacer la solicitud:', error);
    }
  };

  const handleUpdateProfile = async (data, recoveryPasswords) => {
    console.log(data);
    console.log(data.recoverUser.user._id);
    try {
        // Crear el cuerpo de la solicitud con los datos actualizados
        const requestBody = {
            id: data.recoverUser.user._id, // ID del usuario, necesario para identificar el registro
            name: data.recoverUser.user.name, // Nuevo nombre o el valor actual
            email: data.recoverUser.user.email, // Nuevo email o el valor actual
            password: recoverPasswords, // Nueva contraseña si se proporciona
            picture: data.recoverUser.user.profilePicture,
            safetyAnswer: data.recoverUser.user.safetyAnswer
        };

        console.log(requestBody);

        // Realizar la solicitud PUT para actualizar los datos del usuario
        const response = await fetch('http://localhost:4000/api/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': data.recoverUser.token, // Token de autorización
            },
            body: JSON.stringify(requestBody),
        });

        // Verificar la respuesta del servidor
        if (response.ok) {
            const result = await response.json();
            console.log('Perfil actualizado:', result);
            alert('Perfil actualizado exitosamente');
        } else {
            const error = await response.json();
            console.error('Error al actualizar el perfil:', error);
            alert('Hubo un error al actualizar el perfil');
        }
    } catch (error) {
        console.error('Error en la solicitud de actualización:', error);
        alert('Hubo un error al actualizar el perfil');
    }
};

  return (
    <div onSubmit={handleSubmit} className= "container">

      <div className= "header">
        <div className= "text-arreglemos"  onClick={() => navigate('/')}>Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">Ingresar</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        <div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Email" value={email} onChange={handleEmailChange} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña" value={password} onChange={handlePasswordChange} required/>
        </div>

      </div>
      <div className= "forgot-password">Perdiste tu contraseña? <span onClick={setIsModalOpen}>Hace click aqui!</span></div>
      <div className= "submit-container">
        <div className="submit gray"  onClick={() => navigate('/Register')}>Registrarse</div>
        <div className="submit" onClick={handleSubmit} >Ingresar</div>
      </div>

      {/* Modal para la pregunta de seguridad */}
      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Ingrese el Email del usuario
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={recoverEmail}
            onChange={(e) => setRecoverEmail(e.target.value)}
          />
          <Typography variant="h6" component="h2" sx={{ mb: 2 , mt: 4}}>
            Pregunta de Seguridad
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            ¿Cual es el nombre de tu mascota?
          </Typography>
          <TextField
            fullWidth
            label="Respuesta"
            type="outlined"
            value={safetyAnswer}
            onChange={(e) => setSafetyAnswer(e.target.value)}
          />

          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Ingrese nueva Contraseña
          </Typography>
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            value={recoverPasswords}
            onChange={(e) => setRecoverPasswords(e.target.value)}
          />

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleCloseModal}
          >
            Confirmar
          </Button>

          {/* Botón de Cancelar que cierra el modal sin hacer nada */}
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleCancelModal} // Cierra el modal sin ejecutar la acción
        >
          Cancelar
        </Button>

        </Box>
      </Modal>

    </div>
  )
}

export default Login