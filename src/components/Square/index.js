import React from 'react';
import { useSelector } from 'react-redux';

import style from './style.module.scss';

const Square = ({ value, onClick }) => {
  const players = useSelector(state => state.players.players[0]);
  const firstPlayer = players[0];
  const secondPlayer = players[1];
  return (
    <button
      className={style.main}
      type="button"
      onClick={onClick}
      style={{
        color: value === 'X' ? firstPlayer.color : value === 'O' ? secondPlayer.color : '',
      }}
    >
      {value}
    </button>
  );
};

export default Square;
