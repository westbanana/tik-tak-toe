import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

import Board from '../Board';
import Trophy from '../../assets/gifs/trophy.json';
import BackgroundVideo from '../../assets/videos/background.mp4';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players[0]);
  // const gameType = useSelector(state => state.gameType.gameType);
  console.log(players);
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
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  return (
    <div className={style.main}>
      <video src={BackgroundVideo} loop muted autoPlay />
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
            {`${winner === 'X' ? players[0] : players[1]} won the game`}
          </span>
          <div className={style.buttonContainer}>
            <Link to="/">
              <button
                className={style.afterWinButton}
                type="button"
                onClick={() => {
                  dispatch({ type: 'SET_GAME_TYPE', payload: 0 });
                }}
              >
                На главную
              </button>
            </Link>
            <button
              className={style.afterWinButton}
              type="button"
              onClick={restartGame}
            >
              Переиграть
            </button>

          </div>
        </div>
      )}
      <span
        className={style.whoseTurn}
      >
        {`${xIsNext ? players[0] : players[1]} делает свой ход`}
      </span>
      <Board
        className={style.board}
        setBoard={setBoard}
        setXIsNext={setXIsNext}
        squares={board}
        click={handleClick}
      />
    </div>
  );
};

export default Game;
