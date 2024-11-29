import React from 'react'
import {AppBar, Toolbar, Button, Typography, ButtonGroup} from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Toolbar firstChild={true} float="left" alignItems="start">
                        <Typography variant="h6" style={{color: "#F8F8F8"}}>Arreglemos </Typography>
                        <AssuredWorkloadIcon className= "Logo" style={{color: "#F8F8F8"}}/>
                    </Toolbar>

                    <Toolbar alignItems="middle" >
                        <ButtonGroup disableElevation
                                     variant="contained"
                                     aria-label="Disabled button group"
                                     color="">
                            <Button style={{color: "#F8F8F8"}} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>Inicio</Button>
                            <Button style={{color: "#F8F8F8"}} href="https://facundocarrizo.notion.site/TP-Documentacion-1476583c45b480c49225efc4b7f8fa9e" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>Contacto</Button>
                            <Button style={{color: "#F8F8F8"}} href="https://facundocarrizo.notion.site/TP-Documentacion-1476583c45b480c49225efc4b7f8fa9e" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>Ayuda</Button>
                        </ButtonGroup>
                    </Toolbar>

                    <Toolbar lastChild={true} float="right">
                        <Button style={{color: "#F8F8F8"}} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}><InstagramIcon/></Button>
                        <Button style={{color: "#F8F8F8"}} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}><FacebookIcon/></Button>
                        <Button style={{color: "#F8F8F8"}} href="https://www.x.com" target="_blank" rel="noopener noreferrer" onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} 
  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}><XIcon/></Button>
                    </Toolbar>

                </Toolbar>
            </AppBar>
  )
}

export default Navbar

