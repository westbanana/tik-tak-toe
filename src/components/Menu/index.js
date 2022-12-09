import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

import BackgroundVideo from '../../assets/videos/background.mp4';

const Menu = () => {
  const [firstPlayer, setFirstPlayer] = useState();
  const [secondPlayer, setSecondPlayer] = useState();
  const dispatch = useDispatch();
  const gameType = useSelector(state => state.gameType.gameType);

  const changePlayersNames = () => {
    const playersNamesCopy = [firstPlayer, secondPlayer];
    dispatch({ type: 'ADD_PLAYER', payload: [playersNamesCopy] });
  };

  useEffect(() => {
    dispatch({ type: '', payload: 0 });
  }, []);

  return (
    <div className={style.main}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={BackgroundVideo} muted autoPlay loop />
      <h1>TIK TAK TOE</h1>
      {!gameType && (
        <div className={style.gameTypeContainer}>
          <input
            type="button"
            value="1 vs 1"
            onClick={() => {
              dispatch({ type: 'SET_GAME_TYPE', payload: 1 });
            }}
          />
          <input
            onClick={() => {
              dispatch({ type: 'SET_GAME_TYPE', payload: 2 });
            }}
            type="button"
            value="versus bot"
          />
        </div>
      )}
      {gameType === 1 ? (
        <div className={style.humanType}>
          <div>
            <input
              type="text"
              onChange={e => setFirstPlayer(e.target.value)}
              placeholder="Игрок 1"
            />
            <input
              type="text"
              onChange={e => setSecondPlayer(e.target.value)}
              placeholder="Игрок 2"
            />
          </div>
          <div className={style.buttonContainer}>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: 'SET_GAME_TYPE', payload: 0 });
              }}
              className={style.playButton}
            >
              BACK
            </button>
            <Link
              to="/game"
              style={{
                pointerEvents: `${!firstPlayer || !secondPlayer || firstPlayer === secondPlayer ? 'none' : ''}`,
              }}
            >
              <button
                type="button"
                className={style.playButton}
                onClick={changePlayersNames}
                to="/game"
                style={{
                  pointerEvents: `${!firstPlayer || !secondPlayer || firstPlayer === secondPlayer ? 'none' : ''}`,
                }}
                disabled={firstPlayer === '' || secondPlayer === ''}
              >
                PLAY
              </button>
            </Link>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default Menu;
