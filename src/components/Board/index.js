import React, { useRef } from 'react';

import style from './style.module.scss';

import Square from '../Square';
import { ReactComponent as RefreshIcon } from '../../assets/icons/refresh.svg';

const Board = ({
  squares, click, setBoard, setXIsNext, setTurnCount,
}) => {
  const refRefreshIcon = useRef(null);
  const handleClick = () => {
    setTurnCount(0);
    refRefreshIcon.current.classList.add(style.rotate);
    refRefreshIcon.current.classList.add(style.unclickable);
    setTimeout(() => {
      refRefreshIcon.current.classList.remove(style.rotate);
    }, 500);
    setTimeout(() => {
      refRefreshIcon.current.classList.remove(style.unclickable);
    }, 1000);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  return (
    <div className={style.main}>
      <RefreshIcon
        ref={refRefreshIcon}
        className={`${style.refreshIcon} ${style.rotate}`}
        onClick={handleClick}
      />
      {squares.map((square, i) => (
        <Square
          value={square}
          onClick={() => click(i)}
        />
      ))}
    </div>
  );
};

export default Board;
