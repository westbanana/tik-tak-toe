import React, { useState } from 'react';

import style from './style.module.scss';

import BackgroundVideo from '../../assets/videos/background.mp4';

const Menu = () => {
  const [gameType, setGameType] = useState();
  const [playersNames, setPlayerNames] = useState([]);
  const [firstPlayer, setFirstPlayer] = useState();
  const [secondPlayer, setSecondPlayer] = useState();
  const gameTypeHandleClick = (e) => {
    setGameType(e.target.value);
  };
  const changePlayersNames = () => {
    const playersNamesCopy = [firstPlayer, secondPlayer];
    setPlayerNames(playersNamesCopy);
  };
  console.log(playersNames);
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
            onClick={e => gameTypeHandleClick(e)}
          />
          <input
            type="button"
            value="versus bot"
            onClick={e => gameTypeHandleClick(e)}
          />
        </div>
      )}
      {gameType === '1 vs 1' ? (
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
          <div>
            <button
              type="button"
              style={{
                pointerEvents: `${!firstPlayer || !secondPlayer || firstPlayer === secondPlayer ? 'none' : ''}`,
              }}
              disabled={firstPlayer === '' || secondPlayer === ''}
              onClick={changePlayersNames}
            >
              Play
            </button>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default Menu;
