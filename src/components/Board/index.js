import React from 'react';

import style from './style.module.scss';

import Square from '../Square';

const Board = () => (
  <div className={style.main}>
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
  </div>
);

export default Board;
