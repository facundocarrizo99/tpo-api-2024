import React from 'react';
import '../App.css'
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Footer from '../components/Footer/Footer';
import {fetchData} from "../helpers";
import Card from '../components/Card/Card';
import Stats from '../components/Stats/Stats';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';




export function mainLoader() {
    const userName = fetchData("userName");
    return {userName}
}

function App() {
    return (<div style={{width: "100%", height: "100vh", backgroundColor: "#101010"}}>
        {/* Header */}
        <Navbar/>
        {/* Hero Section */}
        <Hero/>
        {/* Feature Section */}
        <div className= "feature">
            <Card img={img1} title="Divide gastos" description="Calcula automáticamente quién debe cuánto en cualquier situación.
                                        Sube tus gastos para que los integrantes del grupo los vean.
                                        Elige qué tipo de división se hará para el monto final."/>

            <Card img={img2} title="Lleva registro" description="Todos pueden ver y revisar sus gastos en cualquier momento.
                                        Acceso fácil al registro de gastos actuales y antiguos.
                                        Comparte historiales con amigos y familiares."/>

            <Card img={img3} title="Notificaciones" description="Mantén a todo el grupo al tanto con notificaciones instantáneas.
                                        Recibe avisos cuando se agregan o se saldan gastos.
                                        Recordatorios periódicos para aquellos que aún deben dinero."/>
        </div>

        <Stats/>

        {/*Footer Section*/}
        <Footer/>
        
    </div>);
}

export default App;
