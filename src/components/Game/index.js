import React, { useState } from 'react';
import Lottie from 'lottie-react';

import style from './style.module.scss';

import Board from '../Board';
import Trophy from '../../assets/gifs/trophy.json';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };
  const winner = calculateWinner(board);
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return null;
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
    return null;
  };
  return (
    <div className={style.main}>
      {winner && (
        <div className={style.winnerContainer}>
          <Lottie
            readOnly
            className={style.gif}
            animationData={Trophy}
            loop={false}
          />
          <span
            className={style.winnerDescription}
          >
            {`${winner} won the game`}
          </span>
        </div>
      )}
      <Board
        setBoard={setBoard}
        setXIsNext={setXIsNext}
        squares={board}
        click={handleClick}
      />
    </div>
  );
};

export default Game;
