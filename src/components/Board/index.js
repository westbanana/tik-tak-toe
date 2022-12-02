import React from 'react';

import style from './style.module.scss';

import Square from '../Square';

const Board = ({ board, onclick }) => (
  <div className={style.main}>
    {board.map((square, i) => (
      <Square
        value={square}
        onClick={() => onclick(i)}
      />
    ))}
  </div>
);

export default Board;
