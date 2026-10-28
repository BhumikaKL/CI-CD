import { useEffect, useState } from "react";

const winningLines = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function getWinner(board) {
  for (const [a,b,c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) return board[a];
  }
  return null;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [apiStatus, setApiStatus] = useState("Checking backend...");
  const winner = getWinner(board);
  const draw = !winner && board.every(Boolean);

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setApiStatus(data.message))
      .catch(() => setApiStatus("Backend is not connected"));
  }, []);

  function makeMove(index) {
    if (board[index] || winner || draw) return;
    const next = [...board];
    next[index] = player;
    setBoard(next);
    if (!getWinner(next) && next.some((cell) => !cell)) {
      setPlayer(player === "X" ? "O" : "X");
    }
  }

  function restartGame() {
    setBoard(Array(9).fill(""));
    setPlayer("X");
  }

  return (
    <main className="app">
      <section className="game-card">
        <p className="eyebrow">TWO PLAYER GAME</p>
        <h1>Tic Tac Toe</h1>
        <p className="status" aria-live="polite">
          {winner ? `Player ${winner} wins!` : draw ? "It's a draw!" : `Player ${player}'s turn`}
        </p>
        <div className="board" role="group" aria-label="Tic Tac Toe board">
          {board.map((cell, index) => (
            <button key={index} className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ""}`}
              onClick={() => makeMove(index)}
              disabled={Boolean(cell) || Boolean(winner) || draw}
              aria-label={`Square ${index + 1}${cell ? `, ${cell}` : ""}`}>
              {cell}
            </button>
          ))}
        </div>
        <button className="restart" onClick={restartGame}>Restart game</button>
        <p className="backend-status">
          <span className={`dot ${apiStatus.includes("not") ? "offline" : ""}`} />
          Backend: {apiStatus}
        </p>
      </section>
    </main>
  );
}
