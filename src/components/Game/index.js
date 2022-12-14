import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

import Board from '../Board';
import Trophy from '../../assets/gifs/trophy.json';
import Tie from '../../assets/gifs/tie.json';
import BackgroundVideo from '../../assets/videos/background.mp4';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [turnCount, setTurnCount] = useState(0);
  const sticks = Array(20).fill(null);
  const dispatch = useDispatch();
  const players = useSelector(state => state.players.players[0]);
  const gameType = useSelector(state => state.gameType.gameType);
  const firstPlayer = () => {
    if (players) {
      return players[0];
    }
    return localStorage.getItem('players')[0];
  };
  const secondPlayer = () => {
    if (players) {
      return players[1];
    }
    return localStorage.getItem('players')[1];
  };
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
        return [squares[a], [a, b, c]];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!localStorage.getItem('players')) {
      localStorage.setItem('players', JSON.stringify(players));
      localStorage.setItem('gameType', gameType);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('board') && localStorage.getItem('players') && localStorage.getItem('gameType')) {
      const boardCopy = JSON.parse(localStorage.getItem('board'));
      setBoard(boardCopy);
      dispatch({ type: 'SET_GAME_TYPE', payload: Number(localStorage.getItem('gameType')) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(board));
  }, [turnCount]);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (gameType === 2 && xIsNext) {
      setTurnCount(turnCount + 1);
      const boardCopy = [...board];
      if (winner || boardCopy[index]) return null;
      boardCopy[index] = 'X';
      setBoard(boardCopy);
      setXIsNext(!xIsNext);
      return null;
    }
    if (gameType === 1) {
      setTurnCount(turnCount + 1);
      const boardCopy = [...board];
      if (winner || boardCopy[index]) return null;
      boardCopy[index] = xIsNext ? 'X' : 'O';
      setBoard(boardCopy);
      setXIsNext(!xIsNext);
      return null;
    }
    return null;
  };

  useEffect(() => {
    if (gameType === 2 && xIsNext === false) {
      const boardCopy = [...board];
      for (let i = 0; i <= 9; i += 1) {
        const randomNumber = Math.floor(Math.random() * 8);
        if (!xIsNext && !boardCopy[randomNumber]) {
          setTimeout(() => {
            setTurnCount(turnCount + 1);
            boardCopy[randomNumber] = 'O';
            setBoard(boardCopy);
            setXIsNext(true);
          }, 500);
          break;
        }
      }
    }
  }, [xIsNext]);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurnCount(0);
    setXIsNext(true);
  };

  const resetGameType = () => {
    dispatch({ type: 'SET_GAME_TYPE', payload: 0 });
  };
  return (
    <div
      className={style.main}
    >
      <div>
        {sticks.map((e, i) => (
          <div
            className={style.sticks}
            style={{
              boxShadow: `${i % 2 === 0 ? firstPlayer().color : secondPlayer().color} 0 0 5px 10px`,
              filter: `blur(${Math.floor(Math.random() * 30)}px)`,
              top: `${Math.floor(Math.random() * 100)}%`,
              background: `${i % 2 === 0 ? firstPlayer().color : secondPlayer().color}`,
            }}
          />
        ))}
      </div>
      <video src={BackgroundVideo} loop muted autoPlay />
      {!winner && turnCount === 9 && (
        <div className={style.winnerContainer}>
          <Lottie
            readOnly
            className={style.gif}
            animationData={Tie}
            loop
          />
          <span
            className={style.winnerDescription}
          >
            Its tie...
          </span>
          <div className={style.buttonContainer}>
            <Link to="/">
              <button
                className={style.afterWinButton}
                type="button"
                onClick={resetGameType}
              >
                Menu
              </button>
            </Link>
            <button
              className={style.afterWinButton}
              type="button"
              onClick={restartGame}
            >
              Restart
            </button>

          </div>
        </div>
      )}
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
            {`${winner[0] === 'X' ? firstPlayer().name : secondPlayer().name} won the game`}
          </span>
          <div className={style.buttonContainer}>
            <Link to="/">
              <button
                className={style.afterWinButton}
                type="button"
                onClick={resetGameType}
              >
                Menu
              </button>
            </Link>
            <button
              className={style.afterWinButton}
              type="button"
              onClick={restartGame}
            >
              Restart
            </button>

          </div>
        </div>
      )}
      <span
        className={style.whoseTurn}
      >
        {`${xIsNext ? firstPlayer().name : secondPlayer().name} your turn`}
      </span>
      <Board
        className={style.board}
        setBoard={setBoard}
        setXIsNext={setXIsNext}
        squares={board}
        setTurnCount={setTurnCount}
        click={handleClick}
      />
    </div>
  );
};

export default Game;
