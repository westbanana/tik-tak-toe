import React, { useState } from 'react';

import style from './style.module.scss';

import Board from '../Board';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = (squares) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winConditions.length; i += i) {
      const [a, b, c] = winConditions[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      return null;
    }
  };
  const handleClick = (index) => {
    const boardCopy = [...board];
    if ( winner || boardCopy[index]) return null;
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setBoard(boardCopy);
  };
  return (
    <div className={style.main}>
      <Board
        board={board}
        onclick={handleClick}
      />
    </div>
  );
};

export default Game;
