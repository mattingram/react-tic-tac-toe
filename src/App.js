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

  function makeRows() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(<Square value={squares[i * 3 + j]} onSquareClick={() => handleClick(i * 3 + j)} isWinningSquare={isWinningSquare(i * 3 + j)} />);
      }
      rows.push(<div className="board-row">{row}</div>);
    }
    return rows;
  }

  return (
    <>
      <div className="status">Status: {status}</div>
      {makeRows()}
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
    if (move == currentMove) {
      return (
        <li key={move}>
          <span>You are at move #{move}</span>
        </li>
      )
    }
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