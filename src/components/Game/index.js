import React from 'react';

import style from './style.module.scss';
import Board from '../Board';

const Game = () => (
  <div className={style.main}>
    <Board />
  </div>
);

export default Game;
