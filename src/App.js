import { useEffect, useState } from 'react';
import Card from "./components/Card";
import skull from "./images/skull.jpg"
import cannon from "./images/cannon.jpg"
import scroll from "./images/scroll.jpg"
import ship from "./images/ship.jpg"
import sword from "./images/sword.jpeg"
import chest from "./images/treasure-chest.jpg"

const cardImages = [
  {"src": skull, matched: false},
  {"src": cannon, matched: false},
  {"src": scroll, matched: false},
  {"src": ship, matched: false},
  {"src": sword, matched: false},
  {"src": chest, matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(prevTurns => prevTurns + 1);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {

      if(choiceOne.src === choiceTwo.src) {
        setDisabled(true);
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            else {
              return card;
            }
          })
        })
        setTimeout(() => resetTurn(), 1000);
      }
      else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
<div className='pirate-memory-game'>
  <h1>Pirate Memory Game</h1>
  <h3>Turns: {turns}</h3>
  <div className="card-grid">
    
    {cards.map(card => {
     return <Card flipped={card === choiceOne || card === choiceTwo || card.matched} 
      handleChoice={handleChoice} 
      key={card.id} 
      card={card} 
      disabled={disabled} />
})}

  </div>
  <button onClick={shuffleCards} type="button" className="btn">New Game</button>
</div>

  );
}

export default App;

