import React from "react";
import "./SingleCard.css"

const SingleCard = ({card, handleChoice, flipped, disabled})=>{
    const handleClick = ()=>{
        if (!disabled){
        handleChoice(card)
    }}
    return(
    <div className="SingleCard">
        <div className={flipped ? "flipped" :""}>
            <img src = {card.src}
             className="front" alt="card front" />
            <img src="./images/cover.png" 
                className="back" 
                onClick={handleClick}
                alt="card back" 
                />
        </div>
    </div>
    )
}

export default SingleCard;