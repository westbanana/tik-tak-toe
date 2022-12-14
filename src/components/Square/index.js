import React from 'react';
import { useSelector } from 'react-redux';

import style from './style.module.scss';

const Square = ({ value, onClick }) => {
  const players = useSelector(state => state.players.players[0]);
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
  return (
    <button
      className={style.main}
      type="button"
      onClick={onClick}
      style={{
        color: value === 'X' ? firstPlayer().color : value === 'O' ? secondPlayer().color : '',
      }}
    >
      {value}
    </button>
  );
};

export default Square;
