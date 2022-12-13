import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './style.module.scss';

import BackgroundVideo from '../../assets/videos/background.mp4';

const Menu = () => {
  const [firstPlayer, setFirstPlayer] = useState({
    name: 'Player 1',
    color: '#ffffff',
  });
  const [secondPlayer, setSecondPlayer] = useState({
    name: 'Player 2',
    color: '#de7b17',
  });
  const dispatch = useDispatch();
  const gameType = useSelector(state => state.gameType.gameType);

  const changePlayersNames = () => {
    const playersCopy = [firstPlayer, secondPlayer];
    dispatch({ type: 'ADD_PLAYER', payload: [playersCopy] });
  };

  const changeGameType = (num) => {
    dispatch({ type: 'SET_GAME_TYPE', payload: num });
  };

  useEffect(() => {
    changeGameType(0);
  }, []);
  useEffect(() => {
    if (gameType === 2) {
      setSecondPlayer({ ...secondPlayer, name: 'BOT' });
    }
  }, [gameType]);
  return (
    <div className={style.main}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src={BackgroundVideo}
        muted
        autoPlay
        loop
      />
      <h1>TIK TAK TOE</h1>
      {!gameType && (
        <div className={style.gameTypeContainer}>
          <input
            type="button"
            value="1 vs 1"
            onClick={() => changeGameType(1)}
          />
          <input
            onClick={() => changeGameType(2)}
            type="button"
            value="versus bot"
          />
        </div>
      )}
      {gameType === 1 && (
        (
          <div className={style.humanType}>
            <div>
              <input
                className={style.colorInput}
                type="color"
                onChange={e => setFirstPlayer({ ...firstPlayer, color: e.target.value })}
                value={firstPlayer.color}
              />
              <input
                className={style.nameField}
                type="text"
                style={{
                  color: firstPlayer.color,
                }}
                onChange={(e) => {
                  setFirstPlayer({ ...firstPlayer, name: e.target.value });
                }}
                placeholder="Player 1"
              />
              <input
                className={style.colorInput}
                type="color"
                onChange={e => setSecondPlayer({ ...secondPlayer, color: e.target.value })}
                value={secondPlayer.color}
              />
              <input
                className={style.nameField}
                type="text"
                style={{
                  color: secondPlayer.color,
                }}
                onChange={(e) => {
                  setSecondPlayer({ ...secondPlayer, name: e.target.value });
                }}
                placeholder="Player 2"
              />
            </div>
            <div className={style.buttonContainer}>
              <button
                type="button"
                onClick={() => changeGameType(0)}
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
        )
      )}
      {gameType === 2 && (
        (
          <div className={style.humanType}>
            <div>
              <input
                className={style.colorInput}
                type="color"
                onChange={e => setFirstPlayer({ ...firstPlayer, color: e.target.value })}
                value={firstPlayer.color}
              />
              <input
                className={style.nameField}
                type="text"
                style={{
                  color: firstPlayer.color,
                }}
                onChange={(e) => {
                  setFirstPlayer({ ...firstPlayer, name: e.target.value });
                }}
                placeholder="Player 1"
              />
            </div>
            <div className={style.buttonContainer}>
              <button
                type="button"
                onClick={() => changeGameType(0)}
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
                  onClick={() => {
                    changePlayersNames();
                    setSecondPlayer({ ...secondPlayer, name: 'BOT' });
                  }}
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
        )
      )}
    </div>
  );
};

export default Menu;
