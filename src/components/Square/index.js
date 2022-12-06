import React from 'react';

import style from './style.module.scss';

const Square = ({ value, onClick }) => (
  <button
    className={style.main}
    type="button"
    onClick={onClick}
    style={{
      background: value === 'X' ? 'red' : value === 'O' ? 'blue' : '',
    }}
  >
    {value}
  </button>
);

export default Square;
