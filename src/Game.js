import React, { useState } from "react";
import "./Game.css";



const Game = ()=> {
    
const cardImages= [
    {"src": "./images/helmet-1.png"},
    {"src": "./images/potion-1.png"},
    {"src": "./images/ring-1.png"},
    {"src": "./images/scroll-1.png"},
    {"src": "./images/shield-1.png"},
    {"src": "./images/sword-1.png"}
]
  
    const [cards, setCards]= useState([]);
    const [turns, setTurns]= useState(0);



    const shuffleCards= ()=>{
        const shuffledCards=[...cardImages,...cardImages]
            .sort(() => Math.random()- 0.5)
            .map((card)=>({...card, id:Math.random()}))           
    
    
    setCards(shuffledCards)
    setTurns(0)
        }

    console.log(cards, turns)

return (
    <div className="Game">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>
     <div className="card-grid">
         {cards.map(card=>(
             <div key={card.id} className="card">
                 <div>
                     <img src = {card.src} className="front" alt="card front"/>
                     <img src="./images/cover.png" className="back" alt="card back"/>
                 </div>
                 

             </div>

         ))}
     </div>
     
     
     <div>{turns}</div>
   
    </div>
)
}
export default Game;






