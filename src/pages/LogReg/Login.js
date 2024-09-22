import React, {useState} from 'react'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import '../LogReg/LogReg.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

const Login = () => {

  const [action,setaction] = useState("Ingresar");

  return (
    <div className= "container">

      <div className= "header">
        <div className= "text-arreglemos">Arreglemos<AssuredWorkloadIcon className= "Logo" style={{color: "#101010"}}/></div>
        <div className= "text-interactivo">{action}</div>
        <div className= "underline"></div>
      </div>
      
      <div className= "inputs">
        {action==="Ingresar"?<div></div>:<div className= "input">
          <AccountCircleIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "text" placeholder= "Nombre de Usuario"/>
        </div>}
        
        <div className= "input">
          <EmailIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "email" placeholder= "Mail"/>
        </div>

        <div className= "input">
          <HttpsIcon className= "Logo" style={{color: "#656565"}}/>
          <input type= "password" placeholder= "Contraseña"/>
        </div>

      </div>
      {action==="Registrarse"?<div></div>:<div className= "forgot-password">Perdiste tu contraseña? <span>Hace click aqui!</span></div>}
      <div className= "submit-container">
        <div className={action==="Ingresar"?"submit gray":"submit"} onClick={()=>{setaction("Registrarse")}}>Registrarse</div>
        <div className={action==="Registrarse"?"submit gray":"submit"} onClick={()=>{setaction("Ingresar")}}>Ingresar</div>
      </div>

    </div>
  )
}

export default Login