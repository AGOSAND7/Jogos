import React, { useState } from "react";
import Quadrado from "./Quadrado";
import './tabuleiro.css'

function Tabuleiro() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [posicoesVencedoras, setPosicoesVencedoras] = useState([]);

  // Reinicia o jogo
  function reiniciarJogo() {
    setQuadrados(Array(9).fill(null));
    setXIsNext(true);
    setPosicoesVencedoras([]);
  }

  function handleClick(index) {
    if (quadrados[index] || calcularVencedor(quadrados)) return;

    const novosQuadrados = quadrados.slice();
    novosQuadrados[index] = xIsNext ? "X" : "O";
    setQuadrados(novosQuadrados);
    setXIsNext(!xIsNext);

    const resultado = calcularVencedor(novosQuadrados);
    if (resultado) {
      setPosicoesVencedoras(resultado.posicoes);
    }
  }

  function renderizarQuadrado(index) {
    const isVencedor = posicoesVencedoras.includes(index); // Verifica se o índice é uma posição vencedora
    return (
      <Quadrado
        value={quadrados[index]}
        onClick={() => handleClick(index)}
        isVencedor={isVencedor}
      />
    );
  }

  const resultado = calcularVencedor(quadrados);
  const status = resultado
    ? `Vencedor: ${resultado.vencedor}`
    : quadrados.every(Boolean)
    ? "Empate!"
    : `Jogador: ${xIsNext ? "X" : "O"}`;

  // Reinício automático após vitória ou empate
  React.useEffect(() => {
    if (resultado || quadrados.every(Boolean)) {
      setTimeout(reiniciarJogo, 2000); // Reinicia após 2 segundos
    }
  }, [resultado, quadrados]);

  return (
    <div style={{ position: "relative", width: "200px", margin: "0 auto" }}>
      <div>{status}</div>
      <div style={{ display: "flex" }}>
        {renderizarQuadrado(0)}
        {renderizarQuadrado(1)}
        {renderizarQuadrado(2)}
      </div>
      <div style={{ display: "flex" }}>
        {renderizarQuadrado(3)}
        {renderizarQuadrado(4)}
        {renderizarQuadrado(5)}
      </div>
      <div style={{ display: "flex" }}>
        {renderizarQuadrado(6)}
        {renderizarQuadrado(7)}
        {renderizarQuadrado(8)}
      </div>
        {resultado && posicoesVencedoras.length === 3 && (
        <div className={`linha-vitoria linha-${posicoesVencedoras.join("")}`}></div>
        )}

      <button
        onClick={reiniciarJogo}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Reiniciar
      </button>
    </div>
  );
}

function calcularVencedor(quadrados) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return { vencedor: quadrados[a], posicoes: [a, b, c] };
    }
  }
  return null;
}

// Função que calcula o estilo do risco vencedor
function calcularEstiloRisco(posicoes) {
  const linhasCoordenadas = {
    0: { x: 0, y: 0 },
    1: { x: 1, y: 0 },
    2: { x: 2, y: 0 },
    3: { x: 0, y: 1 },
    4: { x: 1, y: 1 },
    5: { x: 2, y: 1 },
    6: { x: 0, y: 2 },
    7: { x: 1, y: 2 },
    8: { x: 2, y: 2 },
  };

  const inicio = linhasCoordenadas[posicoes[0]];
  const fim = linhasCoordenadas[posicoes[2]];
  const deltaX = fim.x - inicio.x;
  const deltaY = fim.y - inicio.y;
  const angulo = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return {
    top: `${inicio.y * 33 + 16.5}%`,
    left: `${inicio.x * 33 + 16.5}%`,
    width: `${Math.sqrt(deltaX ** 2 + deltaY ** 2) * 33}%`,
    transform: `rotate(${angulo}deg)`,
  };
}

export default Tabuleiro;


