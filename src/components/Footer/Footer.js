import React from 'react'
import '../Footer/Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <div className="footer">
        <div className="sb__footer section__padding">
            <div className="sb__footer-links">
                <div className="sb__footer-links_div">
                    <h4>Creadores</h4>
                    <a href="student">
                        <p>Facundo Carrizo</p>
                    </a>
                    <a href="student">
                        <p>Santiago Trotta</p>
                    </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>Recursos</h4>
                    <a href="/resource">
                            <p>Centro de recursos</p>
                        </a>
                    <a href="/resource">
                            <p>Testimonios</p>
                        </a>
                    <a href="/resource">
                            <p>Ayuda</p>
                        </a>  
                </div>
                <div className="sb__footer-links_div">
                    <h4>Partners</h4>
                        <a href="/partners">
                                <p>UADE</p>
                            </a>
                </div>
                <div className="sb__footer-links_div">
                    <h4>Ayudanos a mejorar!</h4>
                    <a href="/about">
                            <p>Centro de opiniones</p>
                        </a>
                    <a href="/press">
                            <p>Servicio al cliente</p>
                        </a>
                </div>  
                <div className="sb__footer-links_div">
                    <h4>Encontranos en: </h4>
                    <div className="socialmedia">
                        <InstagramIcon></InstagramIcon>
                        <FacebookIcon></FacebookIcon>
                        <XIcon></XIcon>
                    </div>
                </div> 
            </div>

            <hr></hr>

            <div className="sb__footer-below">
                <div className="sb__footer-copyright">
                    <p>
                        @{new Date().getFullYear()} Arreglemos. Todos los derechos reservados.
                    </p>
                </div>
                <div className="sb__footer-below-links">
                    <a href="/terminos"><div><p>Terminos y condiciones</p></div></a>
                    <a href="/privacidad"><div><p>Privacidad</p></div></a>
                    <a href="/seguridad"><div><p>Seguridad</p></div></a>
                    <a href="/cookie"><div><p>Cookie</p></div></a>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer
