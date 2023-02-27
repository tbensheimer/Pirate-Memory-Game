export default function Card({card, disabled, flipped, handleChoice}) {
    const handleClick = () => {
      if(!disabled) {
        handleChoice(card);
      }
    }

return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img src={card.src} className="front" alt="card-front" />
          <img onClick={handleClick} src={require('../images/card-cover.jpg')} className='back' alt="card-back" />
        </div>
      </div>
)
}
