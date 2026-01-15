function Card({ card, handleClick, flipped, disabled }) {
  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => !disabled && handleClick(card)}
    >
      <div className="inner">
        <div className="front">?</div>
        <div className="back">
          <img src={card.image} alt="card" />
        </div>
      </div>
    </div>
  );
}

export default Card;

