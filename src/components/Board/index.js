import React from 'react';

import style from './style.module.scss';

import Square from '../Square';

const Board = ({ squares, click }) => (
  <div className={style.main}>
    {squares.map((square, i) => (
      <Square
        value={square}
        onClick={() => click(i)}
      />
    ))}
  </div>
);

export default Board;
