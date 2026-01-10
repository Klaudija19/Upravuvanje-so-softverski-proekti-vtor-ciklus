export default function Card({ img, flipped, onClick, size = 100 }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        border: "2px solid #333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {flipped ? (
        <img
          src={img}
          alt="card"
          style={{ width: "90%", height: "90%", objectFit: "contain" }}
        />
      ) : (
        <span style={{ fontSize: "32px" }}>❓</span>
      )}
    </div>
  );
}
