import "../App.css";

export default function Card({ image, flipped, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {flipped ? (
        <img src={image} alt="face" />
      ) : (
        <span className="question">?</span>
      )}
    </div>
  );
}



