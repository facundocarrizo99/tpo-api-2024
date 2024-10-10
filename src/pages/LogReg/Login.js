import React, {useState} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import {users, findUser } from '../../backendLog';
import {useNavigate} from 'react-router-dom';

const Login = ({ searchUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
      e.preventDefault();
      const user = findUser(users, username);
      console.log("Usuario buscado:", user);

      if (user) {
        if (user.password === password) {
          navigate('/Home');
        } else {
          alert("Contraseña incorrecta.");
        }
      } else {
        alert("Usuario no encontrado.");
      }
  };
  

  return (
    <form onSubmit={handleSubmit} className= "container">

      <div className= "header">
        <div className= "text-arreglemos">Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">Ingresar</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        <div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Nombre de Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </div>

      </div>
      <div className= "forgot-password">Perdiste tu contraseña? <span>Hace click aqui!</span></div>
      <div className= "submit-container">
        <div className="submit gray"  onClick={() => navigate('/Register')}>Registrarse</div>
        <div className="submit" onClick={handleSubmit} >Ingresar</div>
      </div>

    </form>
  )
}

export default Login