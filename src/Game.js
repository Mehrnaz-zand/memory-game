import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import SingleCard from "./SingleCard";




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
    const tempQuery = useRef();

    //start game automatically
    useEffect(()=>{
        tempQuery.current();
    }, []) 
    //shuffle cards
    const shuffleCards= ()=>{
        const shuffledCards=[...cardImages,...cardImages]
            .sort(() => Math.random()- 0.5)
            .map((card)=>({...card, id:Math.random()}));

        
        setChoiceOne();
        setChoiceTwo();
        setCards(shuffledCards)
        setTurns(0)
        }
        tempQuery.current = shuffleCards;
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
     <h1 className="title">Magic Match</h1>
    
     <button onClick={shuffleCards} title="New Game">New Game????</button>
     <div className="card-grid" title="click">
         {cards.map(card=>(
             <SingleCard 
             key={card.id} 
             card={card} 
             handleChoice={handleChoice}
             flipped={card === choiceOne || card===choiceTwo || card.matched}
             disabled={disabled}/>
         ))}
     </div>
     
     
     <div className="turns" title="Turns Played">Turns: {turns}</div>
   
    </div>
)
}
export default Game;






