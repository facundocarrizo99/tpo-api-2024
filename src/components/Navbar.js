import React from 'react'
import {AppBar, Toolbar, Button, Container, Grid, Card, CardContent, Typography, ButtonGroup} from '@mui/material';
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
                            <Button style={{color: "#F8F8F8"}}>Inicio</Button>
                            <Button style={{color: "#F8F8F8"}}>Contacto</Button>
                            <Button style={{color: "#F8F8F8"}}>Ayuda</Button>
                        </ButtonGroup>
                    </Toolbar>

                    <Toolbar lastChild={true} float="right">
                        <Button style={{color: "#F8F8F8"}}><InstagramIcon/></Button>
                        <Button style={{color: "#F8F8F8"}}><FacebookIcon/></Button>
                        <Button style={{color: "#F8F8F8"}}><XIcon/></Button>
                    </Toolbar>

                </Toolbar>
            </AppBar>
  )
}

export default Navbar

