import React from 'react'
import '../Card/Card.css'

function Card(props) {
  return (
    <div className= "card">
        <div className= "card-body">
            <img src= {props.img} className= "card-img"/>
            <h2 className= "card-title">{props.title}</h2>
            <p className= "card-description">{props.description}</p>
        </div>
    </div>
  )
}

export default Card
