import { useState } from "react";
import "./App.css";
import { emptyBoard, checkWinner, isDraw, findBestMove } from "./helper";
import type { Board, Cell } from "./type";

const BOARD_SIZE = 3;

export default function App() {
  const [board, setBoard] = useState<Board>(emptyBoard());
  const [isGameOver, setIsGameOver] = useState(false);
  const winner = checkWinner(board);

  const handleClick = (i: number, j: number) => {
    if (board[i][j] || isGameOver) return;

    const newBoard = board.map((row) => [...row]);
    newBoard[i][j] = "X";

    const playerWin = checkWinner(newBoard);
    if (playerWin) {
      gameOverHandle(newBoard);
      return;
    }

    if (isDraw(newBoard)) {
      gameOverHandle(newBoard);
      return;
    }

    const [aiI, aiJ] = findBestMove(newBoard);
    newBoard[aiI][aiJ] = "O";

    const aiWin = checkWinner(newBoard);
    if (aiWin || isDraw(newBoard)) {
      gameOverHandle(newBoard);
      return;
    }

    setBoard(newBoard);
  };

  const gameOverHandle = (newBoard: Cell[][]) => {
    setBoard(newBoard);
    setIsGameOver(true);
  };

  const restart = () => {
    setBoard(emptyBoard());
    setIsGameOver(false);
  };

  return (
    <div className="container">
      <h1 id="playerText">Tic Tac Toe</h1>

      {winner && <h2>Player {winner} winner</h2>}
      {!winner && isDraw(board) && <h2>It's a Draw!</h2>}

      <div
        id="gameBoard"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="box"
              onClick={() => handleClick(i, j)}
              style={{ cursor: isGameOver ? "not-allowed" : "pointer" }}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button id="restartBtn" onClick={restart}>
        Restart
      </button>
    </div>
  );
}
