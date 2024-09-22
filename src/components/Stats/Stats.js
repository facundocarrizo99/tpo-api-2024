import React from 'react'
import '../Stats/Stats.css'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GradeIcon from '@mui/icons-material/Grade';




const Stats = () => {
  return (
    <section class="app-stats">
    <h2 class="stats-title">¿Cuántos estamos usando la app?</h2>
    <div class="stats-container">
        <div class="stat">
            <div class="stat-logo">
                <SupervisedUserCircleIcon/>
            </div>
            <h3 class="stat-number" id="userCount">10.6M</h3>
            <p class="stat-description">Usuarios Activos</p>
        </div>
        <div class="stat">
            <div class="stat-logo">
                <ArrowDownwardIcon/>
            </div>
            <h3 class="stat-number" id="downloadCount">21.2M</h3>
            <p class="stat-description">Descargas Totales</p>
        </div>
        <div class="stat">
            <div class="stat-logo">
                <GradeIcon/>
            </div>
            <h3 class="stat-number" id="ratingCount">9.6</h3>
            <p class="stat-description">Calificación Promedio</p>
        </div>
    </div>
</section>   
  )
}

export default Stats
