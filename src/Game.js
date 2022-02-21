import React, { useEffect, useState } from "react";
import "./Game.css";
import SingleCard from "./SingleCard"



const Game = ()=> {
    
const cardImages= [
    {"src": "./images/helmet-1.png", matched:false },
    {"src": "./images/potion-1.png", matched:false },
    {"src": "./images/ring-1.png", matched:false },
    {"src": "./images/scroll-1.png", matched:false },
    {"src": "./images/shield-1.png", matched:false },
    {"src": "./images/sword-1.png", matched:false }
]
  
    const [cards, setCards]= useState([]);
    const [turns, setTurns]= useState(0);
    const [choiceOne, setChoiceOne]=useState(null);
    const [choiceTwo, setChoiceTwo]=useState(null);
    const [disabled, setDisabled]= useState(false)

    //shuffle cards
    const shuffleCards= ()=>{
        const shuffledCards=[...cardImages,...cardImages]
            .sort(() => Math.random()- 0.5)
            .map((card)=>({...card, id:Math.random()}))           

        setCards(shuffledCards)
        setTurns(0)
        }
        
    //compare 2 selected cards
    useEffect(()=>{
        
        if (choiceOne && choiceTwo){
            setDisabled(true);
            if (choiceOne.src ===choiceTwo.src){
                setCards(prevCards=>{
                    return prevCards.map(card=>{
                        if (card.src===choiceOne.src){
                            return{...card, matched:true}
                        }
                        else{
                            return card
                        }      
                })
            })
                resetTurn()
            }
             else{
            console.log("Don't match")
             setTimeout(()=>resetTurn(), 1000)
            }
            
        }}, [choiceOne, choiceTwo])
      
    console.log(cards)
    //reset cards and increase turns
    const resetTurn =()=>{
        setChoiceOne();
        setChoiceTwo();
        setTurns(prevTurns =>prevTurns+1);
        setDisabled(false);
    }
    
    //handle a choice
    const handleChoice =(card)=> {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
       console.log(card.matched)
    }

return (
    <div className="Game">
     <h1>Magic Match</h1>
    
     <button onClick={shuffleCards}>New Game</button>
     <div className="card-grid">
         {cards.map(card=>(
             <SingleCard 
             key={card.id} 
             card={card} 
             handleChoice={handleChoice}
             flipped={card === choiceOne || card===choiceTwo || card.matched}
             disabled={disabled}/>
         ))}
     </div>
     
     
     <div>{turns}</div>
   
    </div>
)
}
export default Game;






