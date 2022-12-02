import React, { useState } from 'react';

import style from './style.module.scss';

import Board from '../Board';
import {calculateWinner} from "../../Helper";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
  const handleClick = (index) => {
    console.log(index);
    const boardCopy = [...board];
    if ( winner || boardCopy[index]) return null;
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };
  return (
    <div className={style.main}>
      <Board
        squares={board}
        click={handleClick}
      />
    </div>
  );
};

export default Game;
