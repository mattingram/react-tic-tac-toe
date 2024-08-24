import { useState } from "react";

function Square({value, onSquareClick, isWinningSquare}) {
  const style = "square" + (isWinningSquare ? " winning-square" : "");
  return (
    <button className={ style } onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ nextPlayer, squares, onPlay }) {
  let status;

  const winner = calculateWinner(squares);
  const winningSquares = calculateWinningSquares(squares);

  if (winner) {
    status = "Winner: " + winner;
  }
  else {
    status = "The next player is: " + nextPlayer;
  }

  function isWinningSquare(i) {
    return winningSquares.includes(i);
  }

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;
    onPlay(newSquares);
  }

  return (
    <>
      <div className="status">Status: {status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={isWinningSquare(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={isWinningSquare(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={isWinningSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={isWinningSquare(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={isWinningSquare(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={isWinningSquare(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={isWinningSquare(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={isWinningSquare(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={isWinningSquare(8)} />
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function calculateWinningSquares(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return [];
  }
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  let nextPlayer = currentMove % 2 === 0 ? "X" : "O";
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpToMove(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{description}</button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board nextPlayer={nextPlayer} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}