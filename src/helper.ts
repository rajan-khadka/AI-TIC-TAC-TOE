import type { Board, Player } from "./type";

export function emptyBoard(): Board {
  return Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
}

export function checkWinner(board: Board): Player | null {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    )
      return board[i][0];
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      return board[0][i];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return board[0][2];
  return null;
}

export function isDraw(board: Board): boolean {
  return board.flat().every((cell) => cell !== null);
}

export function minimax(board: Board, depth: number, isMax: boolean): number {
  const winner = checkWinner(board);
  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (isDraw(board)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = "O";
          best = Math.max(best, minimax(board, depth + 1, false));
          board[i][j] = null;
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!board[i][j]) {
          board[i][j] = "X";
          best = Math.min(best, minimax(board, depth + 1, true));
          board[i][j] = null;
        }
      }
    }
    return best;
  }
}

export function findBestMove(board: Board): [number, number] {
  let bestScore = -Infinity;
  let move: [number, number] = [-1, -1];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "O";
        const score = minimax(board, 0, false);
        board[i][j] = null;
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }
    }
  }
  return move;
}
