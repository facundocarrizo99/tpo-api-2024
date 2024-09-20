import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import {fetchData} from "../helpers";

export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

function App() {
    return (<div style={{backgroundColor: "#101010"}}>
        {/* Header */}
        <Navbar/>

        {/* Hero Section */}
        <Hero/>

        {/* Feature Section */}
        <Feature/>
    </div>);
}

export default App;
