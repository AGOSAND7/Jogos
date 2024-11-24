import React from "react";

function Quadrado({ value, onClick, isVencedor }) {
  return (
    <button
      style={{
        width: "60px",
        height: "60px",
        fontSize: "20px",
        fontWeight: "bold",
        margin: "5px",
        backgroundColor: isVencedor ? "lightgreen" : "lightgray",
        border: "2px solid black",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}


export default Quadrado;

